## DEMO

https://itunesapp.bules.eu/

https://github.com/Telefonica/living-app-v2-estadio-infinito/assets/15522791/7b096ff7-f52e-4e92-8604-3527bc3f53a4

## BUILD
Local:

`pnpm install`
`pnpm build:local`
`pnpm start:local`

Note that you might have to delete .env.production to avoid CORS error with localhost:3000

## Technologies
- [TypeScript](https://www.typescriptlang.org/) as language
- [Next.js](https://nextjs.org/) as React Front/Back Framework



- [TailwindCSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for TailwindCSS components
- [Cypress](https://www.cypress.io/) for E2E testing
- [Jest](https://jestjs.io/) for Unit testing
- [Testing Library](https://testing-library.com/) for React Components 
  testing
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for pre-commit hooks
- [Commitlint](https://commitlint.js.org/#/) for commit message linting
- [Material UI](https://mui.com/) for icons and components
- [React Query](https://tanstack.com/query/) Infinite scrolls and requests cache management

## Structure
The project is structured following "Screaming Architecture" approach. The structure is the following:
```
src/
|-- modules/
    |-- podcasts/
        |-- domain/
        |-- application/
        |-- infra/
|-- components/
|-- hooks/
|-- sections/
|-- pages/
|-- styles/
|-- lib/
    |-- services/api
    |-- util/
     
```

The `modules` folder contains the different modules of the application. Each module has its own domain, application and infra layers.

The `components` folder contains the different UI shared components of the application.

The `hooks` folder contains the different generic hooks of the application.

The `sections` folder contains specific components and utils functions related with a module.

The `pages` folder contains the different pages (or Next.js routes) of the application

The `styles` folder contains the base styles using TailwindCSS.

The `lib` folder contains generic utils and configurations of the application.

## Modules

Each module follows the same structure, with its own domain, application and infra layers.

```
modules/
|-- podcasts/
    |-- domain/
        |-- Podcast.ts
        |-- PodcastRepository.ts
    |-- application/
        |-- get/
            |-- useGetPodcast.ts
        |-- search/
            |-- useInfiniteSearchPodcasts.ts
        |-- top/
            |-- useListTopPodcasts.ts
    |-- infra/
        |-- ApiPodcastsRepository.ts
```

## Testing

The project has unit and E2E testing. The unit testing is done using **Jest** and **Testing Library**. The E2E testing is done using **Cypress**.

Unit tests and Component tests are in the `__tests__` folder.

The E2E tests are in the `cypress` folder.


## FAQs

- Why we choose NextJs instead of React?

+ I thought the best way to bypass the cors error was by encapsulating in my own server. Making the backend completely opaque to the client.
+ Using NextJs allows me create a kind of middleware to get the data I need giving the front end exactly the data needed.


- Why is there Top podcasts?

+ It had no sense to just show an empty screen with a search bar. Showing top 100 podcasts is not strictly necessary, but welcome.

- Why added infinite scroll to search? 

+ You might found several podcasts after a search, infinite scroll allows you to discover new podcasts.

- Why can't I see all the episodes from a podcast? 

+ Itunes API allows to set an offset and limit with search API, but it doesn't work with lookup API. By using amp-api.music.apple.com we could get the offset functionality, but we need Apple developer program...

- Why React Query?

+ We could use Redux toolkit, SWR, or even no library at all... But React query have Infinite scrolling and request cache out of the box, adittionally you can use the response data as global thanks to the cache system


