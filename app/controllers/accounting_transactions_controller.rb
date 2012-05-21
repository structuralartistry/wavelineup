class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    @page_size = params[:page_size] || 15
    @page_number = params[:page_number] || 1
    @total_records = AccountingTransaction.count
    offset_records = 0
    if @page_number != 1
      offset_records = (@page_size.to_i * @page_number.to_i) - @page_size.to_i
    end
    if params[:search]
      search_string = params[:search]
      # preprocess for amount (convert decimal to integer for matching
      search_string =~ /\$?\d{1,}\.?\d{0,}/
      amount = $& || nil
      if amount
        amount = $&.delete('$.')
        search_string.gsub(amount,'').gsub('  ',' ')
      end

# how to do rails join with alias table name so can write direct sql???
# AccountingTransaction.joins(:category, :account).where('accounting_transactions.categories.name=\'\'').all
                              # this is accounting_category join as is first time OptionSelectorOption joined
      @accounting_transactions = AccountingTransaction.joins('
                                  LEFT OUTER JOIN option_selector_options AS accounting_categories ON accounting_category_id = accounting_categories.id
                                  LEFT OUTER JOIN option_selector_options AS accounting_accounts ON accounting_account_id = accounting_accounts.id')
                              .where('accounting_categories.value ilike :s
                                      OR accounting_accounts.value ilike :s
                                      OR CAST(amount AS VARCHAR) ilike :a', :s => "%#{search_string}%", :a => "%#{amount || ' '}%")
                              .limit(@page_size).offset(offset_records).order('date_time DESC')
                              .all
    else
      @accounting_transactions = AccountingTransaction.limit(@page_size).offset(offset_records).order('date_time DESC').all
    end

    render :template => 'accounting_transactions/index'
  end

  def create
    @accounting_transaction = AccountingTransaction.new(params[:accounting_transaction])
    @accounting_transaction.practice_id = 0
    if @accounting_transaction.save
      render :template => 'accounting_transactions/accounting_transaction', :status => 201
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

  def update
    @accounting_transaction = AccountingTransaction.find(params[:id])
    if @accounting_transaction.update_attributes(params[:accounting_transaction])
      render :template => 'accounting_transactions/accounting_transaction', :status => 202
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

  def destroy
    @accounting_transaction = AccountingTransaction.find(params[:id])
    if @accounting_transaction.destroy
      render :template => 'accounting_transactions/accounting_transaction', :status => 202
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

end
