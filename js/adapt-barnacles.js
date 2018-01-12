define([ "core/js/adapt" ], function(Adapt) {

	var BarnaclesView = Backbone.View.extend({

		className: "barnacles display-none",

		questionModels: null,

		initialize: function() {
			this.listenTo(Adapt, {
				"assessments:reset": this.onAssessmentsReset,
				"assessments:complete": this.onAssessmentsComplete,
				"router:location": this.onRoute
			}).render();
		},

		render: function() {
			$("#wrapper").append(this.$el);
		},

		update: function() {
			this.$el.html(Handlebars.templates.barnacles(this.questionModels.toJSON()));
		},

		onAssessmentsReset: function(state) {
			this.questionModels = state.questionModels;
			this.listenTo(this.questionModels, "change:_isComplete", this.update);
			this.update();
		},

		onAssessmentsComplete: function() {
			this.stopListening(this.questionModels);
		},

		onRoute: function(location) {
			var id = location._currentId;
			var hasAssessment = Adapt.assessment._getAssessmentByPageId(id);

			this.$el.toggleClass("display-none", !hasAssessment);
		}

	});

	Adapt.once("app:dataReady", function() { new BarnaclesView(); });

});
