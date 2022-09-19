describe("has correct layout", () => {
  before(() => {
    cy.visit("/")
  })

  it("has search area", () => {
    cy.get("header")
      .should("exist")
      .get("form#state-search")
      .should("exist")
      .get("form#city-search").should("exist")
      .get("a")
      .should("exist");
  });

  it("has a select element with 50 states and 9 territories", () => {
    cy.get("#state-search select")
      .should("exist")
      .children()
      .should("have.length", 59)
  })

  it("has a text input for cities", () => {
    cy.get("#city-search")
      .get("input[type='text']")
      .should("exist")
      .get("input[type='submit'")
      .should("exist")
  })

  it("has a geolocation search", () => {
    cy.get("header a")
      .should("contain.text", "Search Near Me")
  })
});

describe("with data", () => {
  it("loads correct initial data", () => {  
    cy.intercept("https://api.openbrewerydb.org/breweries", {
      fixture: "baseBreweries.json"
    }).as("fetchBase");
    cy.visit("/")
    cy.wait("@fetchBase")

    cy.get(".brewery:first-child")
      .should("contain.text", "10-56 Brewing Company")
      .should("contain.text", "400 Brown Cir")
  })

  it("submits a state search", () => {
    cy.intercept("https://api.openbrewerydb.org/breweries?by_state=*", {
      fixture: "stateBrew.json"
    }).as("fetchStates");

    cy.get("select")
      .select("New York")
    
    cy.get("#state-search input[type='submit']")
      .click()

    cy.wait("@fetchStates")

    cy.get(".brewery:first-child")
      .should("contain.text", "10 Barrel Brewing Co")
  })

  it("submits a city search", () => {
    cy.intercept("https://api.openbrewerydb.org/breweries?by_city=*", {
      fixture: "cityBrew.json"
    }).as("fetchCities");

    cy.get("#city-search input[type='text']")
      .type("New York")
      .get("#city-search input[type='submit']")
      .click()

    cy.wait("@fetchCities")

    cy.get(".brewery:first-child")
      .should("contain.text", "Alphabet City Brewing Co")
  })

  it("submits a location search", () => {
    cy.intercept("https://api.openbrewerydb.org/breweries?by_dist=*", {
      fixture: "locBrew.json"
    }).as("fetchLocation");

    cy.get("#loc-search a")
      .click()

    cy.wait("@fetchLocation")

    cy.get(".brewery:first-child")
      .should("contain.text", "Folksbier")
  })
})