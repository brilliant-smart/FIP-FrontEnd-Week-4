# FIP Week Four

**Lesson:** RESTFul API

**Learnin outcome:** Learn how to make a API calls (GET, POST, PUT and DELETE)

### Deliverable:

Let's use a fake API from `jsonplaceholder.typicode.com` which is a free REST API to make the following API calls:

- **GET**,
- **POST**,
- **PUT**, and
- **DELETE**.

## Description

- **GET Request**: Fetches data from the API and displays posts.
- **POST Request**: Allows the user to add new posts.
- **PUT Request**: Enables updating existing post.
- **DELETE Request**: Deletes posts from the list.

## API Used

I utilized the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), a free fake online REST API service for testing and prototyping. It provides a variety of placeholder data, including posts, comments, users, and more.

The API provides the following endpoints:

- **GET** `/posts`: Fetches a list of posts.
- **POST** `/posts`: Creates a new post.
- **PUT** `/posts/{id}`: Updates an existing post.
- **DELETE** `/posts/{id}`: Deletes a post.

### Example API Calls

#### 1. GET (Fetch Data From The Server)

```
javascript
axios.get("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    this.setState({ posts: response.data.slice(0, 5) });
  })
  .catch(error => console.log(error));
```

#### 2. POST (Create New Post)

```
axios.post("https://jsonplaceholder.typicode.com/posts", this.state.newPost)
  .then(response => {
    this.setState((prevState) => ({
      posts: [response.data, ...prevState.posts],
      newPost: { title: "", body: "" },
    }));
  })
  .catch(error => console.log(error));
```

#### 3. PUT (Update Post)

```
const updatedPost = {
  title: this.state.editTitle,
  body: this.state.editBody,
};
axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPost}`, updatedPost)
  .then(response => console.log("Updated Post:", response.data))
  .catch(error => console.log(error));
```

#### 4. DELETE (Delete Post)

```
axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then(() => {
    this.setState((prevState) => ({
      posts: prevState.posts.filter((post) => post.id !== id),
    }));
  })
  .catch(error => console.log(error));
```

## How to Run

#### 1. Clone the repository:

`git clone https://github.com/brilliant-smart/FIP-FrontEnd-Week-4`

#### 2. Install dependencies:

`npm install`

#### 3. Run the app locally:

`npm start`

The app will be available at http://localhost:3000

### Deployment

Deployed using GitHub Pages

```
npm run predeploy
npm run deploy
```

### Technologies Used

- **React**
- **Axios (for API calls)**
- **Bootstrap (for styling)**

### Acknowledgements

`JSONPlaceholder for the free fake API service.`

`React for building the UI.`

`Axios for making HTTP requests.`
