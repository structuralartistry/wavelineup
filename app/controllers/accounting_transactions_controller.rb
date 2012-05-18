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
    @accounting_transactions = AccountingTransaction.limit(@page_size).offset(offset_records).order('date_time DESC')
#    if params[:search]

# how to do rails join with alias table name so can write direct sql???
# AccountingTransaction.joins(:category, :account).where('accounting_transactions.categories.name=\'\'').all
#      @accounting_transactions.joins(:category).where('accounting_transactions.
#    end

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
