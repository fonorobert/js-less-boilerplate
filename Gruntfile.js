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
			dev: {
				src: ['node_modules/jquery/dist/jquery.min.js', 'src/js/*.js'], 
				dest: 'js/main.js'
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
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files: {
					'css/main.css': ['src/less/import.less', 'src/less/var.less', 'src/less/structure.less', 'src/less/type.less', 'src/less/sections.less']
				}
			},
			prod: {
				options: {
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
					'cleancss': true
				},
				files: {
					'css/main.min.css': ['src/less/import.less', 'src/less/var.less', 'src/less/structure.less', 'src/less/type.less', 'src/less/sections.less']
				}
			}
		},

		uglify: {
			options: {
				'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
				'mangle': false
			},
			prod: {
				files: {
					'js/main.min.js': ['node_modules/jquery/dist/jquery.min.js', 'src/js/*.js']
				}
			}
		},
		
		watch: {
			js: {
				files: ['src/js/*.js'], 
				tasks: ['jshint:dev', 'concat:dev']
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:gruntfile']
			},
			less: {
				files: ['src/less/*.less'],
				tasks: ['lesslint', 'less:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-lesslint');

	grunt.registerTask('default', ['jshint:dev', 'lesslint', 'concat:dev', 'less:dev']);
	grunt.registerTask('prod', ['jshint:dev', 'uglify:dev', 'less:prod']);
};