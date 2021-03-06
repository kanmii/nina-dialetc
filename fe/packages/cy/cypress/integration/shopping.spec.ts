import {
  shoppingBranchOptionSelector,
  shoppingBranchInputId,
  shoppingAddBrandId,
  shoppingBrandInputId,
  shoppingBrandOptionSelector,

  // BRAND FORM ////////////////////////////////////////////////////////////
  brandNameInputDomId,
  brandCountryInputDomId,
  brandCountryOptionSelector,
  brandCurrencyOptionSelector,
  brandCurrencyInputDomId,
  brandPhoneInputDomId,
  brandSubmitId,
  brandDomId,

  // BRANCH /////////////////////////////////////////////////////////////////
  branchDomId,
  shoppingAddBranchId,
  branchPostCodeInputId,
  branchCityInputId,
  branchStreetInputId,
  branchAliasInputId,
  branchSubmitId,
  branchPhoneInputId,

  // ARTICLE //////////////////////////////////////////////////////////////
  articleDomId,
  shoppingAddArticleId,
  shoppingArticleInputId,
  shoppingArticleOptionSelector,
  articleSpecificNameInputDomId,
  articleGenericNameInputDomId,
  articleTagsInputDomId,
  articleSubmitId,
} from "@ta/cm/src/selectors";
import { getBranchDisplayName } from "@ta/cm/src/components/shopping-utils";

context("Shopping", () => {
  beforeEach(() => {
    cy.checkoutSession();
  });

  const brandName1 = "Edeka";

  const postCode1 = "1234";
  const city1 = "Par";
  const street1 = "55 Williams straße, König, Bayern";
  const alias1 = "könig";
  const branchPhone1 = "844940";

  const articleSpecificName = "Penny rice";
  const articleGenericName = "rice";
  const articleTags = "rice,cheap penny chemnitz";

  describe("create shopping", () => {
    it("success", () => {
      // When we visit the home page
      cy.visit("/");

      // When we click the button to create new shopping

      // BRAND ///////////////////////////////////////////////////////////////

      // When we click on 'Add new shop brand' button
      cy.get("#" + shoppingAddBrandId).click();

      // Shopping brand name field should be empty
      cy.get("#" + shoppingBrandInputId)
        .as("brandInput")
        .should("have.value", "")
        .within(() => {
          cy.get("." + shoppingBrandOptionSelector).should("have.length", 1);
        });

      cy.get("#" + brandDomId).within(() => {
        // When we fill the brand name field
        cy.get("#" + brandNameInputDomId)
          .as("nameEl")
          .should("be.enabled")
          .type(brandName1);

        // When we select a country
        cy.get("." + brandCountryOptionSelector)
          .first()
          .as("countryOptionEl")
          .then((e) => {
            cy.get("#" + brandCountryInputDomId)
              .as("countryEl")
              .select(e.val() as string);
          });

        // When we select a currency
        cy.get("." + brandCurrencyOptionSelector)
          .first()
          .as("currencyOptionEl")
          .then((el) => {
            cy.get("#" + brandCurrencyInputDomId)
              .as("currencyEl")
              .select(el.val() as string);
          });

        // When we fill telephone field
        cy.get("#" + brandPhoneInputDomId)
          .as("phoneEl")
          .type("012345677");

        // When we click submit button on valid brand form
        cy.get("#" + brandSubmitId).click();

        // New ShopBrand UI should not be visible
        cy.get("#" + brandNameInputDomId).should("not.exist");
      });

      // Shopping brandName should be brand name input
      cy.get("@brandInput").within(() => {
        cy.get("option:checked")
          .as("brandName1optionEl")
          .then((e) => {
            expect(e.text().trim()).to.eq(brandName1);
          });
      });

      // BRANCH ////////////////////////////////////////////////////////////////

      // When we click on 'Add new branch' button
      cy.get("#" + shoppingAddBranchId).click();

      // Shopping branch field should be empty
      cy.get("#" + shoppingBranchInputId)
        .as("shopBranchEl")
        .should("have.value", "")
        .within(() => {
          cy.get("." + shoppingBranchOptionSelector).should("have.length", 1);
        });

      cy.get("#" + branchDomId).within(() => {
        // When form fields are completed with valid data
        cy.get("#" + branchPostCodeInputId).type(postCode1);
        cy.get("#" + branchCityInputId).type(city1);
        cy.get("#" + branchStreetInputId).type(street1);
        cy.get("#" + branchAliasInputId).type(alias1);
        cy.get("#" + branchPhoneInputId).type(branchPhone1);

        // When we submit valid branch form
        cy.get("#" + branchSubmitId).click();

        // Branch form should no longer be visible
        cy.get("#" + branchPostCodeInputId).should("not.exist");
      });

      // Shopping branch name should be branch street, city and post code
      const branchName = getBranchDisplayName({
        postCode: postCode1,
        street: street1,
        city: city1,
      });

      cy.get("@shopBranchEl").within(() => {
        cy.get("option:checked")
          .as("branchName1optionEl")
          .then((e) => {
            expect(e.text().trim()).to.eq(branchName);
          });
      });
      // ARTICLE ///////////////////////////////////////////////////////
      // When we click on 'Add' article button
      cy.get("#" + shoppingAddArticleId).click();

      // Article field should be empty
      cy.get("#" + shoppingArticleInputId)
        .as("articleInputEl")
        .should("have.value", "")
        .within(() => {
          cy.get("." + shoppingArticleOptionSelector).should("have.length", 1);
        });

      cy.get("#" + articleDomId).within(() => {
        cy.get("#" + articleSpecificNameInputDomId).type(articleSpecificName);
        cy.get("#" + articleGenericNameInputDomId).type(articleGenericName);
        cy.get("#" + articleTagsInputDomId).type(articleTags);
        cy.get("#" + articleSubmitId).click();
      });

      // Article value should be article element input
      cy.get("@articleInputEl").within(() => {
        cy.get("option:checked").then((e) => {
          expect(e.text().trim()).to.eq(articleSpecificName);
        });
      });
      //
    });
  });
});
