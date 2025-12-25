  ## ----------------------------------------
  ## Deploy From CLI to Vercel
  ## ----------------------------------------

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