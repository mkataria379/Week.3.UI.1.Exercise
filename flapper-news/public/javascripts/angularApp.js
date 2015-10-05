var app = angular.module('flapperNews', ['ui.router'])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
});

.state('home', {
  url: '/home',
  templateUrl: '/home.html',
  controller: 'MainCtrl',
  resolve: {
    postPromise: ['posts', function(posts){
      return posts.getAll();
    }]
  }
})


  $urlRouterProvider.otherwise('home');
}]);


app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
  return o;
   o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;

  
 $scope.posts = posts.posts;

 $scope.addPost = function(){
  if($scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0,
    comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
});
  $scope.title = '';
  $scope.link = '';
};

$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title,
    link: $scope.link,
  });
  $scope.title = '';
  $scope.link = '';
};

o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
};

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
}]);

$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};

.state('posts', {
  url: '/posts/{id}',
  templateUrl: '/posts.html',
  controller: 'PostsCtrl',
  resolve: {
    post: ['$stateParams', 'posts', function($stateParams, posts) {
      return posts.get($stateParams.id);
    }]
  }
});

$scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  $scope.body = '';
};

o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
    .success(function(data){
      comment.upvotes += 1;
    });
};

$scope.incrementUpvotes = function(comment){
  posts.upvoteComment(post, comment);
};

  


$scope.incrementUpvotes = function(post) {
  posts.upvote(post);
};





}]);

