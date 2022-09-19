This document describes the expected layout and format of the US Breweries listing site.

The site should have the following layout:

- [] `body`
    - [] Should have a background color of `#FFF897`
    - [] `header`
        - [] `h1`
            - [] Should have text content of "US Breweries"
        - [] `section`
            - [] `h4`
                - [] Should have text content of "Filter By"
            - [] `section`
                - [] Should be a CSS Grid element with three columns, each containing a search type
                - [] `form`, `id` = `state-search`
                    - [] `label`, `for` = `state`: State
                    - [] `select`, `id` = `state`
                        - [] Values for the select should come from the state variable provided
                    - [] `input`, `type` = `submit`
                - [] `form`, `id` = `city-search`
                    - [] `label`, `for` = `city`: City
                    - [] `input`, `id` = `city`, `type` = `text`
                    - [] `input`, `type` = `submit`
                - [] `div`, `id` = `loc-search`
                    - [] `a`, `href` = `#`: Search Near Me
    - [] `main`
        - `div.brewery`
            - [] `a`, Link to a brewery
                - [] `h2` Name of a brewery
            - [] `p`, Address Line 1 of the brewery
            - [] `p`, Address Line 2 of the brewery
            - [] `p`, Telephone number of the brewery

These features should be implemented

## State Search

When a state is selected and the form is submitted, an API request to search for a brewery by state should be made. The API endpoint for this is `https://api.openbrewerydb.org/breweries?by_state=${state}`. If data is returned from this search, the main section should be populated with breweries. Otherwise, show a message showing that no data was returned.

## City Search

When a city is inputted and the form is submitted, an API request to search for a brewery by city should be made. The API endpoint for this is `https://api.openbrewerydb.org/breweries?by_city=${city}`. If data is returned from this search, the main section should be populated with breweries. Otherwise, show a message showing that no data was returned.

## Area Search

When this link is clicked, an API request to search for breweries around a certain geolocation area must be submitted. The code to get your current geolocation position is provided. The API endpoint for this is `GET https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}`

## Default View

By default, the page should already have some breweries listed. Get these breweries through the `https://api.openbrewerydb.org/breweries` endpoint.