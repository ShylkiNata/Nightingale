<h3>Nightingale Installation Guide</h3>

<p>
    The application logic was divided into corresponding directories. 
    Each of them contains its own package.json with a list of dependencies and scripts.
</p>

1. Install node modules in each (client and server) directory: 
    ```bash
    npm install
    ```
2. Seed database with initial data (server):
    ```bash
    npm run seed
    ```
3. Start devServer (client) / run entry script (server):
    ```bash
    npm run dev
    ```
Note: you may use already created user configuration

    email: admin@example.com  
    password: nightingale
    
or register a new one.