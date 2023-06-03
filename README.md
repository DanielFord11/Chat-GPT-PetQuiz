# Pet-Search


## Description

- The Pet-Search site was made in order to serve as an opportunity to learn about working with a team to collaborate on building a project from scratch, merging and managing a remote repository with many members and working through all aspects, from concept design, through to completion. Although this page is simply an MVP, and could be expanded more. A lot was gained from engaging in this way.

- This page was created to serve as an MVP (Minimum Viable Product) for a web-app which would allow a user to search for animals needing adoption, resources for pets and charities, 2 api's were used (PetFinder and Rapid-Api Dog breed search) additionally, the use of the jQuery modal is incorporated, the UI is polished, and this page solves a real world issue, all framework incorporation requirements were met, and all things we have learned in the course sequence have been implemented in the document.

- This project solves the problem of needing to demonstrate the ability to use JavaScript to dynamically use and manage multiple API resources, the page dynamically use 3rd party API data and presents that information usefully where the user can access it. Bootstrap, as a CSS framework, which our instructor told us we were allowed to use despite the Rubric saying not to use Bootstrap, jQuery for scripting, Font-Awesome for icons, and Bootstrap Javascript/CSS CDN's. These combined make the page dynamically responsive.

- Please note: This application uses persistant data in local storage to store a few items inclding a timestamp for when the API key needs to be refreshed, the API key itself and the modified URL which is used for the search bar. 

- We were able to expand our knowleged of JavaScript with managing multiple API calls, grow while working with a team, learn how to apply my skills to the needs of the user, offer a solution to a problem. My knowledge and understanding of the level of detail that goes into an MVP this simple was greatly expanded.

- Ideas for further development include implementing personality testing functionality using a third API for a personality test, such as Myers-Briggs, or others such as the Enneagram. This would help users match to a pet by their personality and other traits of the pet which are pulled from the other 2 API's. For now the personality test links to a third party personality type test for functionality.

- Here are images of the project
![step 1](https://github.com/guymorganb/Pet-Search/blob/main/assets/secondaryAssests/FirstPageInfo.png?raw=true)

![step 1](https://github.com/guymorganb/Pet-Search/blob/main/assets/secondaryAssests/SearchPage.png?raw=true)

## Table of Contents (N/A)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This webpage can be navigated to and acessed with a browser or mobile device. It does not require installation here: https://guymorganb.github.io/Pet-Search/

## Usage

- This page can be used for learning and demonstration purposes, as well as finding any Dog/Cat/Bird/Horse/Rabbit avaliable through the Pet-Finder API and the contact information of the organization to adopt the animal from.

- Additionally, with this MVP, there is a 2nd API which is integrated into the dogs search results, which is accessed by clicking the 'info' icon. THe info icon is the 2nd icon avaliable on the results page for the dogs, this icon triggers a call to a wikipedia API which will present relevant data avaliable for that specific dog breed.

- To engage this document: Refer to image and see instructions below. Please note: data will be saved into your browsers local storage.

1) As a user, who wants information about adopting a pet, the user can use the search bar to access search by zip, or search by type. 

2) The desired input is typed into the search field. at which point the user is redirected to the results page where they may view a default assortment of animals in line with an MVP(Minimum Viable Product).

3) Once the page is loaded, the user can toggle between te multiple pages of listings which may be avaliable for the animals seeking adoption. 

4) At this point, if the user desires to alter their search parameters, they can do so on the search page, and filter results by distance. Future iterations could have more filtering options, but for now we have an MVP.

5) If the user desires to do a new search from a different location, they may do so on the same page by simply entering in a separate zipcode to search from, and the animals they wish to search for, and their desired distance or.

6) Data is dynamically populated to show in the proper feilds, and dynamically removed.

7) The 2nd API is integrated into the MVP, which is for dogs only. The 2nd API is called when the user click the small 'info' icon when searching for Dogs, and the Wiki API is called which give more breed data on tha t specific animal.

- Please follow this link to access the repository https://github.com/guymorganb/Pet-Search


- Please follow this link https://guymorganb.github.io/Pet-Search/ to access the deployed page
    

## Credits

Pet-Finder API from Purina was used to set up this page and piggyback resources, since this is a 'front-end' only web app, and Rapid-Api Dog search was used to get the data for the breeds.

## License

MIT License

Copyright (c) [2023] [Guy MorganB]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![badmath](https://img.shields.io/github/license/guymorganb/Pet-Search)


## Features

This projects notable features inclue, being an MVP tool to find pets needing adoption, and gain information about those pets, how to adopt them, and useful resources for pets and charities.

## How to Contribute

[Contributor Covenant](https://www.contributor-covenant.org/)

## Tests

Not tests avaliable at this time. I am learning more about how to make tests and implement them with my work.
