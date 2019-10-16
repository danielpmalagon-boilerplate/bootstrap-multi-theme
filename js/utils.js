_utils = function($) {
	
	var public = {
		obj: {
			remove: function (obj, key) {
				var t = {};

				if (typeof obj[key] != 'undefined') {
					for (var i in obj) {
						if (i == key)
							continue;

						t[i] = obj[i];
					}
				}

				return t;
			},

			length: function (obj) {
				return Object.keys(obj).length;
			},

			clone: function (obj) {
				return $.extend(true, {}, obj);
			}
		},

		array: {
			pop: function(array, value) {
				var index = array.indexOf(value);
				array.splice(index, 1);
			}
		},


		string: {
			replace: function (str, find, replace) {
				return str.replace(new RegExp(private.escapeRegExp(find), 'g'), replace);
			}
		},

		capitalize: function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		input: {
			change: function ($el, callback) {
				$el.data('callback', callback);
				$el.bind('propertychange change click keyup input paste', function(event) {
			        // If value has changed...
			        if ($(this).data('oldVal') != $(this).val()) {
			        	var callback = $(this).data('callback');
			            $.isFunction(callback) && callback.call(this, $(this));

			            // Updated stored value
			            $(this).data('oldVal', $el.val());
			        }
			    });
			}
		},

		html: {
			options: function (options, keys) {
				var html = '';
				
				for (var key in options) {
					if (keys)
						html += '<option value="'+key+'">'+options[key]+'</option>';
					else
						html += '<option>'+options[key]+'</option>';
				}

				return html;
			}
		},

		iframe: {
			css: function (selector, links) {
				if (typeof links == 'string')
					links = [ links ];

				for (var i in links) {
					var link = links[i];

					$(selector).contents().find('head').append($("<link/>", 
    					{ rel: "stylesheet", href: link, type: "text/css" }));
				}
			}
		},

		date: {
			display: function (date) {
				return (moment(date, 'YYYY-MM-DD').format('MMM D, YYYY'));
			},

			iso: function (date) {
				return (moment(date, 'MMM D, YYYY').format('YYYY-MM-DD'));
			}
		},

		validation: {
			email: function (email) {
				// Here's the example of regular expresion that accepts unicode:
				//var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(email);
			},

			date: {
				yyyy_mm_dd: function (dateString) {
					var regEx = /^\d{4}-\d{2}-\d{2}$/;
					if(!dateString.match(regEx)) return false;  // Invalid format
					var d = new Date(dateString);
					if(Number.isNaN(d.getTime())) return false; // Invalid date
					return d.toISOString().slice(0,10) === dateString;
				},

				before_today: function (dateString) {
					return new Date(new Date(dateString).toDateString()) < new Date(new Date().toDateString());
				},

				after_today: function (dateString) {
					return new Date(new Date(dateString).toDateString()) > new Date(new Date().toDateString());
				},

				before: function (dateString, referenceDateString) {
					return new Date(new Date(dateString).toDateString()) < new Date(new Date(referenceDateString).toDateString());
				},

				after: function (dateString, referenceDateString) {
					return new Date(new Date(dateString).toDateString()) > new Date(new Date(referenceDateString).toDateString());
				},
			}
		}
	};

	var private = {
		init: function () {
		},

		escapeRegExp: function (str) {
		    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
	};

	private.init();

	return public;

}

utils = new _utils(jQuery);