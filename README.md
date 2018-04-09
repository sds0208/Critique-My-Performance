## Critique My Performance

#### Critique My Performance is a web application for musicians built using React and Firebase. Members can post YouTube or SoundCloud iframes of musical performances or practice sessions and receive critique from other members.

[Here is a link to the application](http://critiquemyperformance.herokuapp.com).

### Technologies used

* React
* ES6
* Firebase

### Explanation

Critique My Performance is my capstone project for Bloc. For this project, I was able to create anything I wanted, using any technologies I wanted to. Since I am a musician, I decided to create an application that had something to do with music. After weighing a few different options, I decided on a music critique app.  

In the application, users must create an account to access The Studio and Profile pages. The authentication is handled through Firebase.  Once a user has created an account, they are able to add a photo using Gravatar, add a username, and post video or audio performances using the YouTube or SoundCloud embed option. All users' performances are posted in The Studio, and users are able to add critique to each performance.

### Problem

The first problem I had was learning how to use Firebase Authentication.

### Solution

While there is quite a bit of documentation available for Firebase Authentication, I was unfamiliar with it when starting the project, and it took some time to figure out how to add and change users' information. Between the documentation and a few YouTube tutorials, I was able to get functional authentication in place.

### Problem

Another problem I ran into when creating the application was getting all of the performances to display every time on the studio page. When first visiting the studio page, only the last performance would show up, until refreshing the page, and then all the performances showed up.

### Solution

I changed how my application was grabbing the information from the firebase database in the `ComponentDidMount()` method. I was originally doing the following:

    `componentDidMount() {
    this.iframesRef.on('child_added', snapshot => {
    const iframe = snapshot.val();
    iframe.key = snapshot.key;
    this.setState({ iframes: this.state.iframes.concat( iframe ) });
    });`
