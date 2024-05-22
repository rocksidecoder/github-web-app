# Backend Setup Instructions

Follow these steps to set up and start the backend server:

## 1. Create Environment Configuration File

1. Navigate to the `config` folder:
    ```sh
    cd config
    ```

2. Create a file named `config.env`:
    ```sh
    touch config.env
    ```

## 2. Setup Environment File

1. Open the `config.env` file:
    ```sh
    nano config.env
    ```

2. Add the necessary environment variables. You can refer to the `config.env.example` file provided within the `config` folder for an example configuration:
    ```env
    DATABASE_URL=your_database_url
    PORT=your_port
    SECRET_KEY=your_secret_key
    ```
3. Add the necessary environment variables in `config/config.json` to run the migration.

4. Save and exit the file.

## 3. Generate GitHub Personal Access Token

1. Visit the following URL to generate a GitHub personal access token: [Creating a personal access token (classic)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

2. Follow the instructions on the page to generate your token.

3. Add the token to your `config.env` file if required:
    ```env
    GITHUB_TOKEN=your_github_token
    ```

## 4. Install Dependencies

1. Make sure you have [Yarn](https://classic.yarnpkg.com/en/docs/install) installed.

2. Install project dependencies:
    ```sh
    yarn install
    ```

## 5. Load Migration in Database

1. Run the database migrations to set up the database schema:
    ```sh
    yarn run migration
    ```

## 6. Start the Server

1. Start the development server:
    ```sh
    yarn run dev
    ```

Your backend server should now be running and accessible.

---

By following these steps, you should be able to set up and run the backend server for your project successfully. If you encounter any issues or have questions, please refer to the project documentation or contact the project maintainers.
