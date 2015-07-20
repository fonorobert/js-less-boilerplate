module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			gruntfile: 'Gruntfile.js',
			dev: 'src/js/*.js'
		},

		lesslint: {
			src: 'src/less/*.less'
		},

		concat: {
			dep: {
				src: ['bower_components/jquery/dist/jquery.min.js'],
				dest: 'dev/js/dependencies.js'
			},
			dev: {
				src: ['src/js/*.js'],
				dest: 'dev/js/main.js'
			},
			options: {
				'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
				'sourceMap': true
			},
		},

		less: {
			dev: {
				options: {
					'sourceMap': true,
					'sourceMapFilename': 'dev/css/main.css.map',
					'sourceMapURL': '/js-less-boilerplate/dev/css/main.css.map',
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files: {
					'dev/css/main.css': ['src/less/import.less']
				}
			},
			build: {
				options: {
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
					'compress': true
				},
				files: {
					'build/css/main.min.css': ['src/less/import.less']
				}
			}
		},

		uglify: {
			options: {
				'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
				'mangle': false
			},
			build: {
				files: {
					'build/js/main.min.js': ['bower_components/jquery/dist/jquery.min.js', 'src/js/*.js']
				}
			}
		},

		 processhtml: {
	      build: {
	        files: {
						'build/index.html': ['index.html']
					}
	      }
    	},

    	copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['src/index.html'], dest: 'dev/', filter: 'isFile'},
		    ],
		  },
		},

		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['jshint:dev', 'concat:dev'],
				options: {
			      livereload: true,
			    }
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:gruntfile']
			},
			less: {
				files: ['src/less/*.less'],
				tasks: ['lesslint', 'less:dev'],
				options: {
			      livereload: true,
			    }
			},
			html: {
				files: ['src/index.html'],
				tasks: ['copy'],
				options: {
			      livereload: true,
			    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('dev', ['jshint:dev', 'lesslint', 'concat:dep', 'concat:dev', 'less:dev', 'copy']);
	grunt.registerTask('build', ['jshint:dev', 'uglify:build', 'less:build', 'processhtml:build']);
};
