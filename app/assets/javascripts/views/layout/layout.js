Wavelineup.Views.Layout = Backbone.View.extend( {
  template: function() {
    var template = " \
    <div class='navbar navbar-fixed-top'> \
      <div class='navbar-inner'> \
        <div class='container-fluid'> \
          <a class='btn btn-navbar' data-toggle='collapse' data-target='.nav-collapse'> \
            <span class='icon-bar'></span> \
            <span class='icon-bar'></span> \
            <span class='icon-bar'></span> \
          </a> \
          <a class='brand' href='#'>Project name</a> \
          <div class='nav-collapse'> \
            <ul class='nav'> \
              <li class='active'><a href='#'>Home</a></li> \
              <li><a href='#about'>About</a></li> \
              <li><a href='#contact'>Contact</a></li> \
            </ul> \
            <p class='navbar-text pull-right'>Logged in as <a href='#'>username</a></p> \
          </div><!--/.nav-collapse --> \
        </div> \
      </div> \
    </div> \
 \
    <div class='container-fluid'> \
      <div class='row-fluid'> \
        <div class='span2'> \
          <div class='well sidebar-nav'> \
            <ul class='nav nav-list'> \
              <li class='nav-header'>Sidebar</li> \
              <li class='active'><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li class='nav-header'>Sidebar</li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li class='nav-header'>Sidebar</li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
              <li><a href='#'>Link</a></li> \
            </ul> \
          </div><!--/.well --> \
        </div><!--/span--> \
        <div class='span10'> \
          <div id='header'>HEADER</div> \
          <div id='left_column'>LEFT COLUMN</div> \
          <div id='notices'>NOTICES</div> \
          <div id='data_selector_container'>DATA SELECTOR CONTAINER</div> \
          <div id='content'>CONTENT</div> \
          <div class='hero-unit'> \
            <h1>Hello, world!</h1> \
            <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p> \
            <p><a class='btn btn-primary btn-large'>Learn more &raquo;</a></p> \
          </div> \
          <div class='row-fluid'> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
          </div><!--/row--> \
          <div class='row-fluid'> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
            <div class='span4'> \
              <h2>Heading</h2> \
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> \
              <p><a class='btn' href='#'>View details &raquo;</a></p> \
            </div><!--/span--> \
          </div><!--/row--> \
        </div><!--/span--> \
      </div><!--/row--> \
 \
      <hr> \
 \
      <footer> \
        <p>&copy; Company 2012</p> \
      </footer> \
 \
    </div><!--/.fluid-container--> \
    "
    return _.template(template);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
