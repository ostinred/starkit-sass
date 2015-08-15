# Scaffolding 
### Bootstrap 3  
#### SASS version

## Instructions
  
#### 1. clone files
		$ git clone git@gitlab.reclamare.ua:common/startkit-sass.git your project name directory

#### 2. enter your new folder
		cd your project name directory

#### 3. install all bower components
		bower install

#### 4. install all grunt modules
		npm install

#### 5. give name for our new project
		Gruntfile.js -> 6. appName:	'YourProjectName',

#### 6. in this command all magic
		grunt init

#### 7. now copy fonts to the directory fonts

#### 8. sass\bootstrap\_variables.scss -> string 46 copy it and give name of your font to variable.
		$font-family:             'Your font';
		$font-family-sans-serif:  $font-family, Helvetica, Arial, sans-serif !default;

* Attention: 

		Your fonts must have the same names as in the file "sass/bootstrap/_fonts.scss"
		Example: Lato-Regular, Roboto-Regular, Lato-Bold, Roboto-Bold, Lato-Italic, Bold-Italic etc.
		IF NOT: rename there your font-files.

#### 9. copy all our fonts to the dist folder
		grunt copyfont

#### 10. hook up our sass-files:

	   a) sass\bootstrap\_mixins.scss
			on the top copy next:
		@import "mixins/media-rules";
		@import "mixins/dev-mixins";
		@import "_dev-extend";
	   b) sass\_bootstrap.scss
		on the top copy next:
		@import "bootstrap/dev-variables";

		before core css copy next:
		@import "bootstrap/_fonts";

#### 11. deleting some strings:

		a) sass\_bootstrap.scss -> 16. @import "bootstrap/glyphicons"
		b) sass\font-awesome\font-awesome.scss -> 8. @import "path";
		c) sass\owl-carousel2\owl.theme.default.scss -> 30. @import 'mixins';

#### 12. you can work with your new project
		grunt
		grunt watch

#### 13. index.html -> hook up your css and js files

#### 14. after initialize our project before commit do next:
		$ git remote set-url origin 
		an example:
		$ git remote set-url origin git@gitlab.reclamare.ua:common/your-project.git
		after as usual 
		$ git add . 

## 	 Clone this project from existing repository 
		bower install
		npm install
		grunt deleteRepeat /* delete repeat of sass src files in the bower_components */
		grunt watch
