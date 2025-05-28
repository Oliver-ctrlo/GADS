/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { LayoutDefinition } from "./builders/layout/definitions";
import { IBuildable, IDropdownLayoutBuilder } from "./builders/layout/interfaces";
import { LayoutBuilder } from "./builders/layout/LayoutBuilder";
import { instanceMode, tablePermissions } from "./constants";

export { }

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get a component by name
             * @param name The name of the element to get
             * @example cy.getByName('username')
             */
            getByName(name: string): Chainable;
            /**
             * Get a component by title
             * @param title The title of the element to get
             * @example cy.getByTitle('username')
             */
            getByTitle(title: string): Chainable;
            /**
             * Login to the application
             * @param email The email to use to login
             * @param password The password to use to login
             * @example cy.login('username@example.com','password')
             */
            login(email: string, password: string): Chainable;
            /**
             * Login then navigate to a page
             * @param email The email to use to login
             * @param password The password to use to login
             * @param path The location to navigate to after login
             * @example cy.loginAndGoTo('username@example.com','password','/home')
             */
            loginAndGoTo(email: string, password: string, path: string): Chainable;
            /**
             * Get the main body of the page
             * @example cy.mainBody() - this is the same as `cy.get('.content-block__main')`
             * @see login
             */
            mainBody(): Chainable;
            /**
             * Get the main header of the page
             * @example cy.mainHeader() - this is the same as `cy.get('.content-block__head')`
             */
            mainHeader(): Chainable;
            /**
             * Get the data table of the page
             * @example cy.getDataTable() - this is the same as `cy.mainBody().find('.data-table')`
             */
            getDataTable(): Chainable;
            /**
             * Create a title in the system
             * @param title The title to create in the system
             * @example cy.createTitle('New Title')
             */
            createTitle(title: string): Chainable;
            /**
             * Create an organisation in the system
             * @param title The title of the organisation to create
             * @example cy.createOrganisation('New Organisation')
             */
            createOrganisation(title: string): Chainable;
            /**
             * Create a group in the system
             * @param title The title of the group to create
             * @example cy.createGroup('New Group')
             */
            createGroup(title: string): Chainable;
            /**
             * Add a user to a group
             * @param email The email of the user to add to the group
             * @param group The name of the group to add the user to
             * @example cy.addUserGroup('bob@home.com','Admin')
             * @see createGroup 
             */
            addUserGroup(email: string, group: string): Chainable;
            /**
             * Delete a group from the system
             * @param title The title of the group to delete
             * @example cy.deleteGroup('Admin')
             */
            deleteGroup(title: string): Chainable;
            /**
             * Create a layout in the system
             * @param builder The layout builder to use to create the layout
             * @example cy.createLayout(LayoutBuilder.createBuilder('TEXT').setName('test').setShortName('t'))
             */
            createLayout(builder: IBuildable): Chainable;
            /**
             * Create a layout in the system
             * @param builder The layout builder to use to create the layout
             * @param navigate Whether to navigate to the layout page before creating the layout
             * @example cy.createLayout(LayoutBuilder.createBuilder('TEXT').setName('test').setShortName('t'), true)
             */
            createLayout(builder: IBuildable, navigate: boolean): Chainable;
            /**
             * Delete a layout by short name
             * @param shortName The short name of the layout to delete
             * @example cy.deleteLayoutByShortName('t')
             */
            deleteLayoutByShortName(shortName: string): Chainable;
            /**
             * Delete a layout by short name
             * @param shortName The short name of the layout to delete
             * @param navigate Whether to navigate to the layout page before deleting the layout
             * @example cy.deleteLayoutByShortName('t')
             */
            deleteLayoutByShortName(shortName: string, navigate: boolean): Chainable;
            /**
             * Create an instance in the system
             * @param instanceName The name of the instance to create
             * @example cy.createInstance('Test Instance')
             */
            createInstance(instanceName: string, shortName?: string): Chainable;
            /**
             * Go to an instance by short name
             * @param shortName The short name of the instance to go to
             * @example cy.gotoInstanceByShortName('test')
             */
            gotoInstanceByShortName(shortName: string, mode: instanceMode): Chainable;
            /**
             * Delete a instance by short name
             * @param shortName The short name of the instance to delete
             * @example cy.deleteInstanceByShortName('t')
             */
            deleteInstanceByShortName(shortName: string): Chainable;
            /**
             * Set a fields value by short name
             * @param shortName The short name of the field to set the value for
             * @param value The value to set the field to
             */
            setFieldValueByShortName(shortName: string, value: string | { to: string, from: string }): Chainable;
            /**
             * Set the permissions for a table by short name
             * @param shortName The short name of the table to set the permissions for
             * @param permissions The permissions to set for the table
             */
            setTablePermissionsByShortName(shortName: string, permissions: { [key in tablePermissions]?: boolean }): Chainable;
            /**
             * Create layouts using a layout definition
             * @param layoutDefs The layout definitions to create
             */
            createLayoutsFromDefinition(layoutDefs: LayoutDefinition): Chainable;
            /**
             * Add a user to the default group
             * @param user The user to add to the default group
             */
            addUserToDefaultGroup(user: string): Chainable;
            /**
             * Add data to a layout using a layout definition
             * @param layoutDefs The layout definitions to create
             */
            addDataToLayoutFromDefinition(layoutDefs: LayoutDefinition): Chainable;
            /**
             * Delete all data from a table
             * @param table The table to delete all data from
             */
            deleteAllData(table: string): Chainable;
            /**
             * Purge all deleted data from a table
             * @param shortName The short name of the table to purge data from
             */
            purgeAllDeletedData(shortName: string): Chainable;
            /**
             * Delete layouts using a layout definition
             * @param layoutDefs The layout definitions to delete
             */
            deleteLayoutsFromDefinitions(layoutDefs: LayoutDefinition): Chainable;
            /**
             * Clear all permissions for a table
             * @param shortName The short name of the table to clear permissions for
             */
            clearAllTablePermissions(shortName: string): Chainable;
            populateTableWithLayouts(shortName: string): Chainable;
            cleanTableOfLayouts(shortName: string): Chainable;
            clearImports(shortName: string): Chainable;
            bulkImportRecords(): Chainable;
            bulkImportRecords(csvFilePath: string): Chainable;
            logout(): Chainable;
        }
    }
}

Cypress.Commands.add('getByName', (name: string) => cy.get(`[name=${name}]`));

Cypress.Commands.add('getByTitle', (title: string) => cy.get(`[title=${title}]`));

Cypress.Commands.add("login", (email: string, password: string) =>
    cy.visit('http://localhost:3000')
        .get("#username").type(email)
        .get("#password").type(password)
        .getByName("signin").click()
        .location("pathname").should("not.include", "/login"));

Cypress.Commands.add('loginAndGoTo', (email: string, password: string, path: string) => cy.login(email, password).visit(path));

Cypress.Commands.add('mainBody', () => cy.get(".content-block__main"));

Cypress.Commands.add('mainHeader', () => cy.get(".content-block__head"));

Cypress.Commands.add('getDataTable', () => cy.mainBody().find(".data-table"));

Cypress.Commands.add('createTitle', (title: string) => {
    if (!location.pathname.match(/title_add/)) {
        cy.visit('http://localhost:3000/settings/title_add/');
    }
    return cy.mainBody().find("input[name='title']").type(title)
        .mainBody().find("button[type='submit']").click()
        .getDataTable().find("tbody").find("tr").contains(title);
});

Cypress.Commands.add('createOrganisation', (title: string) => {
    if (!location.pathname.match(/organisation_add/)) {
        cy.visit('http://localhost:3000/settings/organisation_add/');
    }
    return cy.mainBody().find("input[name='title']").type(title)
        .mainBody().find("button[type='submit']").click()
        .getDataTable().find("tbody").find("tr").contains(title);
});

Cypress.Commands.add('createGroup', (title: string) => {
    if (!location.pathname.match(/group_add/)) {
        cy.visit('http://localhost:3000/group_add/');
    }
    return cy.mainBody().find('input[name="name"]').type(title)
        .mainBody().find("button[type='submit']").click()
        .getDataTable().find("tbody").find("tr").contains(title);
});

Cypress.Commands.add('addUserGroup', (email: string, group: string) => {
    if (!location.pathname.match('/user_overview/')) {
        cy.visit('http://localhost:3000/user_overview/');
    }
    return cy.get('tr').contains('td', email).parent().click()
        .get('label.checkbox-label').contains(group).prev('input[type="checkbox"]').check({ force: true })
        .mainBody().find("button[type='submit']").click();
});


Cypress.Commands.add('deleteGroup', (title: string) => {
    if (!location.pathname.match(/group_overview/)) {
        cy.visit('http://localhost:3000/group_overview/');
    }
    return cy.contains('a', title).click()
        .get('.btn-delete').click()
        .get('.btn.btn-danger').click();
});

Cypress.Commands.add('createLayout', (builder: IBuildable, navigate: boolean = false) => {
    builder.build(navigate);
    return cy.mainBody();
});

Cypress.Commands.add('deleteLayoutByShortName', (shortName: string, navigate: boolean = false) => {
    if (navigate) {
        cy.visit("http://localhost:3000/table");
        cy.getDataTable()
            .find("a")
            .contains("Edit table")
            .click();
        cy.get("a")
            .contains("Fields")
            .click();
    }
    return cy.getDataTable()
        .find("tbody")
        .find("tr")
        .find("td")
        .contains(shortName)
        .click()
        .get(".btn-danger")
        .contains("Delete field")
        .click()
        .get(".modal")
        .find(".btn-danger")
        .contains("Delete")
        .click();
});

Cypress.Commands.add("createInstance", (instanceName: string, shortname: string = instanceName.toLocaleLowerCase().replace(" ", "")) => {
    cy.visit("http://localhost:3000/table")
        .get("button")
        .contains("New table")
        .click()
        .get(".modal")
        .should("be.visible")
        .find("input#name[name=name]")
        .type(instanceName)
        .get("input[name=shortName]")
        .type(shortname)
        .get("button.btn-js-next")
        .contains("Next")
        .should("be.visible")
        .click()
        .get("button.btn-js-save")
        .contains("Save table")
        .should("be.visible")
        .click();
});

Cypress.Commands.add("gotoInstanceByShortName", (shortName: string, mode: instanceMode) => cy.visit(`http://localhost:3000/${shortName}/${mode ? mode : ""}`));

Cypress.Commands.add("deleteInstanceByShortName", (shortName: string) => cy.gotoInstanceByShortName(shortName, "edit")
    .get("button")
    .contains("Delete table")
    .click()
    .get(".modal")
    .should("be.visible")
    .find("button")
    .contains("Delete")
    .click());

Cypress.Commands.add("setFieldValueByShortName", (shortName: string, value: string | { to: string, from: string }) =>
    cy.get(`[data-name-short="${shortName}"]`)
        .then(($el) => {
            const type = $el.data('column-type');
            if (["string", "intgr", "date", "daterange"].includes(type)) {
                const input = $el.find("input");
                cy.wrap(input)
                    .then(($input) => {
                        if (type === "daterange") {
                            if (typeof value !== "object") throw new Error("Value must be an object with 'to' and 'from' properties");
                            cy.wrap($input).eq(0).type(value.from);
                            cy.wrap($input).eq(1).type(value.to);
                        } else if (["string", "intgr", "date"].includes(type)) {
                            if (typeof value !== "string") throw new Error("Value must be a string");
                            cy.wrap($input).type(value);
                        } else {
                            throw new Error(`Unknown type: ${type}`);
                        }
                    });
            } else if (type === "enum") {
                const dropdown = $el.find(".form-control");
                cy.wrap(dropdown)
                    .then(($dropdown) => {
                        cy.wrap($dropdown).click()
                        cy.get(`[data-value="${value}"]`)
                            .click({ force: true });
                    });
            }
        }));

Cypress.Commands.add("setTablePermissionsByShortName", (shortName: string, permissions: { [key in tablePermissions]?: boolean }) => {
    cy.gotoInstanceByShortName(shortName, "edit")
        .get("a").contains("Permissions").click()
        .get("span").contains('basic').click();
    for (const [group, permission] of Object.entries(permissions)) {
        if (permission) {
            cy.get("label").contains(group)
                .then(($label) => {
                    const target = $label.attr("for");
                    cy.get(`input#${target}`).check({ force: true });
                });
        } else {
            cy.get("label").contains(group)
                .then(($label) => {
                    const target = $label.attr("for");
                    cy.get(`input#${target}`).uncheck({ force: true });
                });
        }
    }
    return cy.get("button").contains("Save").click();
});

Cypress.Commands.add("createLayoutsFromDefinition", (layoutDefs: LayoutDefinition) => {
    for (const [layoutType, layoutDef] of Object.entries(layoutDefs)) {
        const builder = LayoutBuilder.create(<any>layoutType);
        builder
            .withName(layoutDef.name)
            .withShortName(layoutDef.shortName);
        if ("options" in layoutDef) {
            // This should not happen, but just in case
            const ddOptions = layoutDef.options!;
            if (ddOptions) {
                for (const option of ddOptions.values) {
                    (builder as IDropdownLayoutBuilder).addOption(option);
                }
            }
        }
        cy.createLayout(builder, true);
        builder.checkField();
    }
    return cy.mainBody();
});

Cypress.Commands.add("addUserToDefaultGroup", (user: string) =>
    cy.visit('http://localhost:3000/user_overview/')
        .get('td').contains(user).click()
        .get('input#groups_1').check({ force: true })
        .get('button[name="submit"]').click()
);

Cypress.Commands.add("addDataToLayoutFromDefinition", (layoutDefs: LayoutDefinition) => {
    cy.visit('http://localhost:3000/table1/data');
    cy.get('a.btn-add').contains('Add a record').click();
    for (const [layoutType, layoutDef] of Object.entries(layoutDefs)) {
        cy.setFieldValueByShortName(layoutDef.shortName, layoutDef.data!);
    }
    return cy.get('button[name="submit"]').contains("Submit and exit").click();
});

Cypress.Commands.add("deleteAllData", (table: string) =>
    cy.setTablePermissionsByShortName(table, { "Delete records": true, "Purge deleted records": true, "Bulk delete records": true })
        .gotoInstanceByShortName(table, "data")
        .get("button").contains("Actions").click()
        .get("a[data-target='#bulkDelete']").click()
        .get("button[type='submit']").contains("Delete").click()
);

Cypress.Commands.add("purgeAllDeletedData", (shortName: string) => {
    cy.visit('http://localhost:3000/table1/purge')
        .get("input[type='checkbox']").check({ force: true })
        .get("button[data-target='#purge']").click()
        .get("button[type='submit']").contains("Confirm").click()
    //.get('button')cy, : .cre
    //.should('be.visible')
    //.click();
});

Cypress.Commands.add("deleteLayoutsFromDefinitions", (layoutDefs: LayoutDefinition) => {
    for (const [layoutType, layoutDef] of Object.entries(layoutDefs)) {
        cy.deleteLayoutByShortName(layoutDef.shortName, true);
    }
    return cy.mainBody();
});

Cypress.Commands.add("clearAllTablePermissions", (shortName: string) => {
    const permissions = { "Delete records": false, "Purge deleted records": false, "Download records": false, "Bulk import records": false, "Bulk update records": false, "Bulk delete records": false, "Manage linked records": false, "Manage child records": false, "Manage views": false, "Manage group views": false, "Select extra view limits": false, "Manage fields": false, "Send messages": false }
    cy.setTablePermissionsByShortName(shortName, permissions);
    return cy.mainBody();
});

Cypress.Commands.add("populateTableWithLayouts", (shortName: string) => {
    const layoutDefs: LayoutDefinition = {
        "TEXT": { name: "Text Field", shortName: "txt_fd" },
        "INTEGER": { name: "Number Field", shortName: "int_fd" },
        "DATE": { name: "Date Field", shortName: "date_fd" },
        "DATE-RANGE": { name: "Range Field", shortName: "range_fd" },
        "DROPDOWN": { name: "Dropdown Field", shortName: "drop_fd", options: { values: ["Red", "Green", "Blue"]}}
    }
    //   { type: "DOCUMENT", name: "Document", shortName: "doc" },
    //   { type: "PERSON", name: "Person Field", shortName: "person" },

    cy.createLayoutsFromDefinition(layoutDefs);
});


Cypress.Commands.add("cleanTableOfLayouts", (shortName: string) => {
    const layoutDefs =
    {
        "TEXT": { name: "Text Field", shortName: "txt_fd" },
        "INTEGER": { name: "Number Field", shortName: "int_fd" },
        "DATE": { name: "Date Field", shortName: "date_fd" },
        "DATE-RANGE": { name: "Range Field", shortName: "range_fd" },
        "DROPDOWN": { name: "Dropdown Field", shortName: "drop_fd", options: { values: ["Red", "Green", "Blue"]}},
    };

    // Loop through each layout definition
    cy.deleteLayoutsFromDefinitions(layoutDefs); // Delete each layout by shortName
});


Cypress.Commands.add("clearImports", (shortName) => {
    cy.visit(`http://localhost:3000/${shortName}/import`);
    cy.contains('button.btn-danger', 'Clear completed reports')
        .click();

    cy.get('#deleteModal')
        .should('be.visible')
        .within(() => {
            cy.contains('button', 'Confirm').click();
        });

    cy.get('td.dt-empty')
        .should('contain.text', 'No imports to show');
});


Cypress.Commands.add("bulkImportRecords", (csvFilePath = 'cypress/fixtures/Import-test-data.csv') => {

    cy.visit('http://localhost:3000/table1/data');

    cy.get('button#bulk_actions').click();
    cy.get('a[href="/table1/import/"]').click();

    cy.get('h2.table-header__page-title')
        .should('contain.text', 'Import records');

    cy.get('a[href="/table1/import/data/"]').click();

    cy.get('h2.table-header__page-title')
        .should('contain.text', 'Upload');


    cy.get("label").contains("Dry run")
        .then(($label) => {
            const target = $label.attr("for");
            cy.get(`input#${target}`).uncheck({ force: true });
        });


    cy.get('input[type="file"]').selectFile(csvFilePath, { force: true });

    cy.contains('Submit').click();

    cy.get('.alert.alert-success')
        .should('be.visible')
        .and('contain.text', 'The file import process has been started');

    cy.wait(5000);

    cy.visit('http://localhost:3000/table1/import');
    cy.get('a.link--plain')
        .contains('Completed')
        .should('exist');

    cy.get('a.link--plain').contains(/errors:\s*0/);
    cy.get('a.link--plain').contains(/skipped:\s*0/);
});

Cypress.Commands.add("addUserToDefaultGroup", (user: string) =>
    cy.visit('http://localhost:3000/user_overview/')
        .get('td').contains(user).click()
        .get('input#groups_1').check({ force: true })
        .get('button[name="submit"]').click()
);

Cypress.Commands.add("addDataToLayoutFromDefinition", (layoutDefs: LayoutDefinition) => {
    cy.visit('http://localhost:3000/table1/data');
    cy.get('a.btn-add').contains('Add a record').click();
    for (const [layoutType, layoutDef] of Object.entries(layoutDefs)) {
        cy.setFieldValueByShortName(layoutDef.shortName, layoutDef.data!);
    }
    return cy.get('button[name="submit"]').contains("Submit and exit").click();
});

Cypress.Commands.add("deleteAllData", (table: string) =>
    cy.setTablePermissionsByShortName(table, { "Delete records": true, "Purge deleted records": true, "Bulk delete records": true })
        .gotoInstanceByShortName(table, "data")
        .get("button").contains("Actions").click()
        .get("a[data-target='#bulkDelete']").click()
        .get("button[type='submit']").contains("Delete").click()
);

Cypress.Commands.add("purgeAllDeletedData", (shortName: string) =>
    cy.visit('http://localhost:3000/table1/purge')
        .get("input[type='checkbox']").check({ force: true })
        .get("button[data-target='#purge']").click()
        .get("button[type='submit']").contains("Confirm").click()
);

Cypress.Commands.add("deleteLayoutsFromDefinitions", (layoutDefs: LayoutDefinition) => {
    for (const [layoutType, layoutDef] of Object.entries(layoutDefs)) {
        cy.deleteLayoutByShortName(layoutDef.shortName, true);
    }
    return cy.mainBody();
});

Cypress.Commands.add("clearAllTablePermissions", (shortName: string) => {
    const permissions = { "Delete records": false, "Purge deleted records": false, "Download records": false, "Bulk import records": false, "Bulk update records": false, "Bulk delete records": false, "Manage linked records": false, "Manage child records": false, "Manage views": false, "Manage group views": false, "Select extra view limits": false, "Manage fields": false, "Send messages": false }
    cy.setTablePermissionsByShortName(shortName, permissions);
    return cy.mainBody();
});

Cypress.Commands.add('logout', ()=>{
    cy.get('a[href="/logout"]').click();
})
