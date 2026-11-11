Dependency Injection

----> DEPENDENCY

     -------------->
index ---> api ----> services ----> data-mem
                              ----> unsplash-api.js --> HTTP fetch to unsplash
                               ----> unsplash-fake.js (with the same interface/functions) - Fakes


You require UNIT tests for non-http modules.
You require UNIT tests for Domain, Services,

Unit Tests should not depend of External Services (e.g. RAWG, unsplash, or other). because:
- Rate limits
- External service maybe down
- ....

??? How can I test my services without depending of unsplash ???
R: We create a Fake or Mock.

?? How do we replace the real one by the fake one without changing the services source-code ????
  => WE DONT'T want to have hard-coded: 
    > import { getImageUri } from "./unsplash-fake.js";
  => WE DONT WANT to change it manually to: import { getImageUri } from "./unsplash-api.js";

When I am running the server with: node index => to use unsplash-api.js
When I am running unit tests: unsplash-fake.js


