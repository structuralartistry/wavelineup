class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    respond_with AccountingTransaction.order('created_at DESC').all
  end

  def create
    respond_with AccountingTransaction.create(params[:accounting_transaction])
  end

  def show
    respond_with AccountingTransaction.find(params[:id])
  end

  def update
    respond_with AccountingTransaction.update(params[:id], params[:accounting_transaction])
  end

  def destroy
    respond_with AccountingTransaction.destroy(params[:id])
  end

end
