import React, { Component } from "react";
import axios from "axios";

class ApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        title: "",
        body: "",
      },
      //I suffered here, but now is editing
      editingPost: null,
      editTitle: "",
      editBody: "",
    };
  }

  // 1. GET Request (Fetch data from the API to display posts)
  // Using json placeholder API without auth
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // Limiting to 5 posts
        this.setState({ posts: response.data.slice(0, 5) });
      })
      .catch((error) => console.log(error));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        [name]: value,
      },
    }));
  };

  // 2. POST Request(Post new post to the API)
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state.newPost)
      .then((response) => {
        this.setState((prevState) => ({
          posts: [response.data, ...prevState.posts],
          newPost: { title: "", body: "" },
        }));
      })
      .catch((error) => console.log(error));
  };

  // 3. PUT Request(Update an existing post on the API)
  //the JsonPlaceHolder is assigning random IDs for the posts. So, I had to change from the UI, then post..
  // Starting the edit
  handleUpdate = (id) => {
    const postToEdit = this.state.posts.find((post) => post.id === id);
    this.setState({
      editingPost: id,
      editTitle: postToEdit.title,
      editBody: postToEdit.body,
    });
  };

  // Bringing our the edit form
  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Saving the updated post both locally and via the API
  handleSaveUpdate = (e) => {
    e.preventDefault();
    const { editTitle, editBody, editingPost } = this.state;

    // Stage 1: Update the post locally
    this.setState((prevState) => ({
      posts: prevState.posts.map((post) =>
        post.id === editingPost
          ? { ...post, title: editTitle, body: editBody }
          : post
      ),
      editingPost: null,
      editTitle: "",
      editBody: "",
    }));

    // Stage 2: Perform the PUT request to update the post in the API
    const updatedPost = {
      title: editTitle,
      body: editBody,
    };

    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${editingPost}`,
        updatedPost
      )
      .then((response) => {
        console.log("Updated Post:", response.data);
      })
      .catch((error) => console.log(error));
  };

  // Cancel the editing and revert to the original post
  handleCancelEdit = () => {
    this.setState({ editingPost: null, editTitle: "", editBody: "" });
  };

  // 4. DELETE Request(Delete a post from the API)
  handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          posts: prevState.posts.filter((post) => post.id !== id),
        }));
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { posts, newPost, editTitle, editBody, editingPost } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="container w-md-50">
          <div className="card p-4 shadow-lg">
            <h2 className="text-center">Week Four Deliverables</h2>
            <p className="text-center mb-0">
              Let's use JSONPlaceholder - Free Fake REST API to mimic a blog and
            </p>
            <small className="text-center text-muted mb-2">
              Showcase the API Calls (GET, POST, PUT, DELETE) for the
              Deliverables
            </small>

            {/* Add Post Form */}
            <form onSubmit={this.handleSubmit} className="mb-3">
              <input
                type="text"
                name="title"
                className="form-control mb-2"
                placeholder="Post Title"
                value={newPost.title}
                onChange={this.handleChange}
                required
              />
              <textarea
                name="body"
                className="form-control mb-2"
                placeholder="Post Body"
                value={newPost.body}
                onChange={this.handleChange}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary w-100">
                Add Post
              </button>
            </form>

            {/* List of all the Posts */}
            <ul className="list-group">
              {posts.map((post) => (
                <li key={post.id} className="list-group-item mb-2 shadow-sm">
                  {editingPost === post.id ? (
                    // Editing form
                    <form onSubmit={this.handleSaveUpdate}>
                      <input
                        type="text"
                        name="editTitle"
                        className="form-control mb-2"
                        value={editTitle}
                        onChange={this.handleEditChange}
                        required
                      />
                      <textarea
                        name="editBody"
                        className="form-control mb-2"
                        value={editBody}
                        onChange={this.handleEditChange}
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="btn btn-success btn-sm me-2"
                      >
                        Update Post
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={this.handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    // Displaying the post
                    <>
                      <h3 className="fw-bold">{post.title}</h3>
                      <p>{post.body}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => this.handleUpdate(post.id)}
                        >
                          Edit Post
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(post.id)}
                        >
                          Delete Post
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ApiComponent;
