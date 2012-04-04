class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    respond_with AccountingTransaction.all
  end

  def create
    respond_with AccountingTransaction.create(params[:entry])
  end

  def show
    respond_with AccountingTransaction.find(params[:id])
  end

  def update
    respond_with AccountingTransaction.update(params[:id], params[:entry])
  end

  def destroy
    respond_with AccountingTransaction.destroy(params[:id])
  end

end
