import { LUA } from "../../../src/frontend/js/lib/util/formatters/lua";
import { LayoutBuilder } from "../../support/builders/layout/LayoutBuilder";
import {
  ICodeLayoutBuilder,
  ICurvalLayoutBuilder,
  IDropdownLayoutBuilder,
  ILayoutBuilder
} from "../../support/builders/layout/interfaces";
import { goodPassword, goodUser } from "../../support/constants";

describe("View create/edit action tests", () => {
  const table_shortname = "table1";

  const viewDef: ViewDefinition = {
    name: "Test view",
    filters: [
      {
        field: "Text Field",
        operator: "equal",
        value: "RECORD 5 \\<",
        typeahead: false
      },
      {
        field: "Dropdown Field",
        operator: "equal",
        value: "Blue",
        typeahead: true
      },
      {
        field: "Dropdown Field",
        operator: "equal",
        value: "Red",
        typeahead: true
      }

    ],
    fields: ["Text Field", "Date Field", "Dropdown Field"]
  };

  before(() => {
    cy.log("login").login(goodUser, goodPassword);
    cy.log("setup table permissions");
    const permissionObject: Record<string, boolean> = {};
    [
      "Bulk import records",
      "Purge deleted records",
      "Delete records",
      "Bulk delete records",
      "Manage views"
    ].forEach((permissionName) => {
      permissionObject[permissionName] = true;
    });
    cy.setTablePermissionsByShortName(table_shortname, permissionObject);
    cy.log("create layouts");
    cy.populateTableWithLayouts("my_table_shortname");
    cy.clearImports(table_shortname);
    cy.bulkImportRecords();
    cy.clearImports(table_shortname);
    cy.logout();
  });

  beforeEach(() => {
    cy.login(goodUser, goodPassword);
    cy.gotoInstanceByShortName("table1", "data");
  });

  afterEach(() => {
    cy.log("Deleting view");
    cy.gotoInstanceByShortName("table1", "data")
      .get("span").contains("Manage views").click()
      .get('a[role="menuitem"]').contains("Edit current view").click()
      .get(".btn-js-delete").contains("Delete view").click()
      .get('button[type="submit"]').contains("Delete").click();
  });

  after(() => {
    cy.deleteAllData("table1");
    cy.purgeAllDeletedData("table1");
    cy.cleanTableOfLayouts("table1");
    cy.clearAllTablePermissions("table1");
  });

  it("Creates a personal view with dropdown filter from a typeahead", () => {
    cy.log("Creating a view")
      .get("span").contains("Manage views").click()
      .get('a[role="menuitem"]').contains("Add a view").click()
      .get('input[name="name"]').type(viewDef.name)
      .get("span").contains("Filter").click()
      .get("button").contains("Add rule").click()
      .get("div.filter-option-inner-inner").click()
      .get('a[role="option"]').contains(viewDef.filters[1].field).click()
      .get("div.filter-option-inner-inner").contains("equal").click()
      .get('a[role="option"]').contains(viewDef.filters[1].operator).click()
      .get("input.tt-input").type(
        viewDef.filters[1].typeahead
          ? viewDef.filters[1].value.slice(0, 2)
          : viewDef.filters[1].value
      )
      .get("div.tt-suggestion").contains(viewDef.filters[1].value).click()
      .get("span").contains("Fields").click();

    for (const field of viewDef.fields) {
      cy.get("#table-view-fields-available").find("td.check").contains(field).click();
    }

    cy.get('button[type="submit"]').contains("Save").click();
    cy.contains("span", "Current view: Test view").should("exist");
    cy.get("td.dt-empty").should("not.exist");
  });

  it("Creates a personal with text filter, followed by an edit", () => {
    cy.log("Creating a view")
      .get("span").contains("Manage views").click()
      .get('a[role="menuitem"]').contains("Add a view").click()
      .get('input[name="name"]').type(viewDef.name)
      .get("span").contains("Filter").click()
       .get("button").contains("Add rule").click()
       .get("div.filter-option-inner-inner").contains("------").click()
       .get(".dropdown-menu.show").last()
       .find('a[role="option"]').not('[aria-hidden="true"]').contains(viewDef.filters[0].field).click()
       .get('input.form-control[type="text"]').last()
       .type(viewDef.filters[0].value);                  // FIX THIS


    cy.get('button[type="submit"]').contains("Save").click();
    cy.contains("span", "Current view: Test view").should("exist");
    cy.get("td.dt-empty").should("not.exist");
    cy.contains("Showing 1 to 1 of 1 entry").should("be.visible");

    cy.log("Editing the view to add a filter")
      .get("span").contains("Manage views").click()
      .get('a[role="menuitem"]').contains("Edit current view").click()
      .get("span").contains("Filter").click()
       .get("button").contains("Add rule").click()
       .get("div.filter-option-inner-inner").contains("------").click()
       .get(".dropdown-menu.show").last()
       .find('a[role="option"]').not('[aria-hidden="true"]').contains(viewDef.filters[1].field).click()
       .get('input.tt-input:visible').last()
       .type(
           viewDef.filters[1].typeahead
           ? viewDef.filters[1].value.slice(0, 2)
           : viewDef.filters[1].value
       )
       .get("div.tt-suggestion").contains(viewDef.filters[1].value).click()
       cy.get('button[type="submit"]').contains("Save").click(); 
       cy.contains("span", "Current view: Test view").should("exist"); 
       cy.get("td.dt-empty").should("not.exist"); 
       cy.contains("Showing 1 to 1 of 1 entry").should("be.visible");
       
       cy.log("Editing the view again to add a 3rd filter and fields")
       .get("span").contains("Manage views").click()
       .get('a[role="menuitem"]').contains("Edit current view").click()
       .get("span").contains("Filter").click()
       .get("button").contains("Add rule").click()
       .get("div.filter-option-inner-inner").contains("------").click()
       .get(".dropdown-menu.show").last()
       .find('a[role="option"]').not('[aria-hidden="true"]').contains(viewDef.filters[2].field).click()
       .get('input.tt-input:visible').last()
       .type(
           viewDef.filters[2].typeahead
           ? viewDef.filters[2].value.slice(0, 1)
           : viewDef.filters[2].value
       )
       .get("div.tt-suggestion").contains(viewDef.filters[2].value).click()
       .get("span").contains("Fields").click();

    for (const field of viewDef.fields) {
      cy.get("#table-view-fields-available").find("td.check").contains(field).click();
    }

       cy.get('button[type="submit"]').contains("Save").click(); 
       cy.contains("span", "Current view: Test view").should("exist"); 
       cy.get("td.dt-empty").should("exist"); 
       cy.contains("Showing 0 to 0 of 0 entries").should("be.visible");
       cy.get('thead th').contains('Date Field').should('exist');
       cy.get('thead th').contains('Text Field').should('exist');
       cy.get('thead th').contains('Dropdown Field');
  });
});

