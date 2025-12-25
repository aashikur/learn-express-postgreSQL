  ## ----------------------------------------
  ## Deploy From CLI to Vercel
  ## ----------------------------------------
  
    "rootDir": "./src",
    "outDir": "./dist",

  First Vercel global install kore login korte hbe.
  ```
  npm i -g vercel
  vercel login
  ```

  Google Search : deploy express typescript app to vercel

# dist build korar jonno command
    ```
   tsc

  ```
- let's delete dist folder first
- then
- to run by 'npm run build' we need to set a comment in package.json
as 
```
"scripts": {
    "build": "tsc"
  },
  ```
  then 
  ```
npm run build
```
now dist folder will be created (previously we deleted)


 after install and login in vercel in CLI  

 ```
 vercel.json
 ``` 
 file need to crate

 ```
 {
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node",
      "config": { "includeFiles": ["dist/**"] }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

then 

```
vercel --prod
```

  eta run korle kichu question korbe seta answer dite hbe.
  then deploy hoye jabe.

  jehetu amra ekbar deploy korechi tai next time sudhu 
  ```
  vercel --prod
  ```
  ei command diyei deploy korte parbo.

  jodi kono file change kori tahole abar build kore 
  ```
  npm run build
  ```
  erpor 
  ```
  vercel --prod
  ```
  diye deploy kore dibo.

  ## Sometime environment variable need to be set in Vercel Dashboard

  ## Done!!!