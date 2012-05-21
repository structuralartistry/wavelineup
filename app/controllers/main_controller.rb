class MainController < ApplicationController

  def index
    @option_selectors_json = OptionSelector.all.to_json

    @option_selector_options_json = OptionSelectorOption.all.to_json

    @accounting_transactions_json = AccountingTransaction.all.to_json
  end

end
