class MainController < ApplicationController

  def index
    option_selectors = OptionSelector.all
    @option_selectors_json = Rabl::Renderer.json(option_selectors, 'option_selectors/index', :view_path => 'app/views')

    option_selector_options = OptionSelectorOption.all
    @option_selector_options_json = Rabl::Renderer.json(option_selector_options, 'option_selector_options/index', :view_path => 'app/views')

    accounting_transactions = AccountingTransaction.all
    @accounting_transactions_json = Rabl::Renderer.json(accounting_transactions, 'accounting_transactions/index', :view_path => 'app/views')
  end

end
