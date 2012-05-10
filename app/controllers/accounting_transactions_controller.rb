class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    @accounting_transactions = AccountingTransaction.all
  end

  def create
    @response = AccountingTransaction.create(params[:accounting_transaction])
debugger
    render :template => 'shared/response'
  end

  def update
    respond_with AccountingTransaction.update(params[:id], params[:accounting_transaction])
  end

  def destroy
    respond_with AccountingTransaction.destroy(params[:id])
  end

end
