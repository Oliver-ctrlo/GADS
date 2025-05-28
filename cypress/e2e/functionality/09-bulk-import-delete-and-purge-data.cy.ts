import "../../support/commands";
import { goodPassword, goodUser } from "../../support/constants";

describe("Layout creation tests", () => {
  const table_shortname = "table1";

  before(() => {
    cy.log("login")
      .login(goodUser, goodPassword);
    cy.log("setup table permissions");
    const permissionObject = {};
    ["Bulk import records", "Purge deleted records", "Delete records", "Bulk delete records"].forEach((permissionName) => {
      permissionObject[permissionName] = true;
    });
    cy.setTablePermissionsByShortName(table_shortname, permissionObject);
    cy.log("create layouts");
    cy.populateTableWithLayouts("my_table_shortname");
    cy.logout();
  });

  beforeEach(() => {
    cy.login(goodUser, goodPassword);
  });

  it('Should navigate to Import Records page and check erroring for invalid file upload', () => {
    cy.visit('http://localhost:3000/table1/data');

    cy.get('button#bulk_actions').click();

    cy.get('a[href="/table1/import/"]').click();

    cy.get('h2.table-header__page-title')
      .should('contain.text', 'Import records');

    cy.get('a[href="/table1/import/data/"]').click();

    cy.get('h2.table-header__page-title')
      .should('contain.text', 'Upload');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/testfile.html', { force: true });

    cy.contains('Submit').click();

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'import headings not found in table');

  });

  it('Should clear completed and verify empty Imports table', () => {
    cy.clearImports(table_shortname);
  });

  it('Should carry out an  Import with dry run still selected, then confirm no errors', () => {
    cy.visit('http://localhost:3000/table1/data');

    cy.get('button#bulk_actions').click();

    cy.get('a[href="/table1/import/"]').click();

    cy.get('h2.table-header__page-title')
      .should('contain.text', 'Import records');

    cy.get('a[href="/table1/import/data/"]').click();

    cy.get('h2.table-header__page-title')
      .should('contain.text', 'Upload');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/Import-test-data.csv', { force: true });

    cy.contains('Submit').click();

    cy.get('.alert.alert-success')
      .should('be.visible')
      .and('contain.text', 'The file import process has been started');

    cy.wait(5000);

    cy.visit('http://localhost:3000/table1/import/');
    cy.get('a.link--plain')
      .contains('Completed')
      .should('exist');

    cy.get('a.link--plain').contains(/errors:\s*0/);
    cy.get('a.link--plain').contains(/skipped:\s*0/);

    cy.visit('http://localhost:3000/table1/data');
    cy.get('td.dt-empty')
      .should('be.visible')
      .and('contain', 'There are no records available');

  });

  it('Should carry out the full bulk Import process and check records have the new records been created ', () => {
    cy.bulkImportRecords();
  });

  it('clears completed reports and verifies empty state', () => {
    cy.clearImports("table1");
  });

  it('should open the actions dropdown, delete all records, and verify empty table', () => {
    cy.visit(`http://localhost:3000/${table_shortname}/data`);

    cy.get('button#bulk_actions').click();

    cy.get('a#delete_href')
      .should('be.visible')
      .and('contain', 'Delete all records in this view')
      .click();

    cy.get('#bulkDelete').should('be.visible');


    cy.get('button[name="modal_delete"]')
      .should('be.visible')
      .click();


    cy.get('td.dt-empty')
      .should('be.visible')
      .and('contain', 'There are no records available');
  });

  it('should purge all deleted records on the table', () => {
    cy.purgeAllDeletedData(table_shortname);
  });

  it("Should delete all layouts", () => {

    cy.cleanTableOfLayouts(table_shortname);

    cy.get('div.layout-field')
      .should('have.length', 0)
      .each(($layout) => {
        cy.wrap($layout).should('contain', 'Field');
      });
  });

  it(`Should clear all permissions for ${table_shortname}`, () => {
    cy.clearAllTablePermissions(table_shortname);
  });
});
