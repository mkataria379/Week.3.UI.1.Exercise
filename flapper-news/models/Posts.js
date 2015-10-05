var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

o.create = function(post) {
  return $http.post('/posts', post).success(function(data){
    o.posts.push(data);
  });
};

o.get = function(id) {
  return $http.get('/posts/' + id).then(function(res){
    return res.data;
  });
};

o.addComment = function(id, comment) {
  return $http.post('/posts/' + id + '/comments', comment);
};


mongoose.model('Posts', PostsSchema);
