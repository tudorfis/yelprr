'use strict';

app.factory('Task', function(FURL, $firebaseObject, $firebaseArray, Auth, $q) {
	var ref = new Firebase(FURL);
	var tasks = $firebaseArray(ref.child('tasks'));
	var user = Auth.user;

	var Task = {
		all: tasks,

		getTask: function(key) {
			return $firebaseObject(ref.child('tasks').child(key));
		},
				
		createTask: function(task) {
			var deffered = $q.defer();
			task.datetime = Firebase.ServerValue.TIMESTAMP;
			var newTask = ref.child('tasks').push();
			newTask.set(task);
			deffered.resolve(newTask.key());
			return deffered.promise;
		},

		editTask: function(task) {
			var deffered = $q.defer();
			var t = ref.child('tasks').child(task.$id);			
			deffered.resolve(t.update({title: task.title, description: task.description, total: task.total}));
			return deffered.promise;
		},

		cancelTask: function(taskId) {
			var deffered = $q.defer();
			var t = ref.child('tasks').child(taskId);			
			deffered.resolve(t.update({status: "canceled"}));
			return deffered.promise;
		},

		isCreator: function(task) {			
			return (user && user.provider && user.uid === task.poster);
		},

		isOpen: function(task) {
			return task.status === "open";
		},

		// --------------------------------------------------//

		isAssignee: function(task) {
			return (user && user.provider && user.uid === task.runner);	
		},

		completeTask: function(taskId) {
			var t = this.getTask(taskId);
			return t.update({status: "completed"});
		},

		isCompleted: function(task) {
			return task.status === "completed";
		}
	};

	return Task;

});