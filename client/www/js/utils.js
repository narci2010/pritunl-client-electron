var app = remoteRequire('app');

var uuid = function() {
  var id = '';

  for (var i = 0; i < 8; i++) {
    id += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return id;
};

var getUserDataPath = function() {
  return app.getPath('userData');
};

function WaitGroup() {
  this.count = 0;
  this.waiter = null;
}

WaitGroup.prototype.add = function() {
  this.count += 1;
};

WaitGroup.prototype.done = function() {
  this.count -= 1;
  if (this.count <= 0) {
    if (this.waiter) {
      this.waiter();
    }
  }
};

WaitGroup.prototype.wait = function(callback) {
  if (this.count === 0) {
    callback();
  } else {
    this.waiter = callback;
  }
};

module.exports = {
  uuid: uuid,
  getUserDataPath: getUserDataPath,
  WaitGroup: WaitGroup
};
