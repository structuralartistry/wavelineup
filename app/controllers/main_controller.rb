class MainController < ApplicationController

  def index
    option_selectors = OptionSelector.all
    @option_selectors_json = Rabl::Renderer.json(option_selectors, 'option_selectors/index', :view_path => 'app/views')

    option_selector_options = OptionSelectorOption.all
    @option_selector_options_json = Rabl::Renderer.json(option_selector_options, 'option_selector_options/index', :view_path => 'app/views')
  end

end
