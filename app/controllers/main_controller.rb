class MainController < ApplicationController
  def index
    @option_selectors_json = OptionSelector.all.to_json
    @option_selector_options_json = OptionSelectorOption.all.to_json
    #@option_selectors_json = Rabl::Renderer.json(OptionSelector.all, 'option_selectors/index', :view_path => 'app/views')
  end
end
