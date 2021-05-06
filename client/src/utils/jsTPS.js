

export class jsTPS_Transaction {
    constructor() {};
    doTransaction() {};
    undoTransaction () {};
}

export class AddRegion_Transaction extends jsTPS_Transaction{
    constructor(region, addFunction, deleteFunction){
        super();
        this.region = region;
        this._id = '';
        this.add = addFunction;
        this.delete = deleteFunction
    }

    async doTransaction() {
        const { data } = await this.add({variables: { region: this.region}})
        this._id = data.addRegion[0];
        this.region[0]._id = this._id;
        return data;
    }

    async undoTransaction() {
        const { data } = await this.delete({variables: {_id: this._id}})
        return data;
    }
}

export class DeleteRegion_Transaction extends jsTPS_Transaction{
    constructor(_id, deleteFunction, addFunction){
        super();
        this._id = _id;
        this.returning = [];
        this.delete = deleteFunction;
        this.add = addFunction;
    }

    async doTransaction() {
		const { data } = await this.delete({ variables: { _id: this._id}});
        if (this.returning.length != 0) return data; 
        let regions = data.deleteRegion;
        const createRegion = (x) => {
            return {
                _id: x._id,
                name: x.name,
                capital: x.capital,
                leader: x.leader,
                owner: x.owner,
                parent: x.parent,
                last_opened: x.last_opened,
                children: x.children,
                landmarks: x.landmarks
            }
        }
        this.returning = regions.map(x => createRegion(x));
		return data;
    }

    async undoTransaction() {
        console.log(this.returning);
        const { data } = await this.add({ variables: { region: this.returning}});
		return data;
    }
}

export class UpdateRegionField_Transaction extends jsTPS_Transaction {
    constructor(_id, field, prev, update, callback) {
        super();
        this.prev = prev;
        this.update = update;
        this.field = field;
        this._id = _id;
        this.updateFunction = callback;
    }
    async doTransaction() {
		const { data } = await this.updateFunction({ variables: { _id: this._id, field: this.field, value: this.update }});
		return data;
    }
    async undoTransaction() {
        const { data } = await this.updateFunction({ variables: { _id: this._id, field: this.field, value: this.prev }});
		return data;
    }
}

export class UpdateRegionArray_Transaction extends jsTPS_Transaction {
    constructor(_id, field, oldArray, newArray, updateListFunc){
        super();
        this._id = _id;
        this.field = field;
        this.oldArray = oldArray;
        this.newArray = newArray;
        this.updateListFunc = updateListFunc;
    }
    async doTransaction() {
		const { data } = await this.updateListFunc({ variables: { _id: this._id, field: this.field, array: this.newArray}});
		return data;
    }
    async undoTransaction() {
        const { data } = await this.updateListFunc({ variables: { _id: this._id, field: this.field, array: this.oldArray}});
		return data;
    }
}

export class UpdateRegionParent_Transaction extends jsTPS_Transaction {
    constructor(_id, oldParent, newParent, changeParent){
        super();
        this._id = _id;
        this.oldParent = oldParent;
        this.newParent = newParent;
        this.changeParent = changeParent;
    }
    async doTransaction() {
		const { data } = await this.changeParent({ variables: { _id: this._id, parentId: this.newParent}});
		return data;
    }
    async undoTransaction() {
        const { data } = await this.changeParent({ variables: { _id: this._id, parentId: this.oldParent}});
		return data;
    }
}


//---------------Old-Todolist-Stuff----------------------------------------------------------------------------------------
/*  Handles list name changes, or any other top level details of a todolist that may be added   */
export class UpdateListField_Transaction extends jsTPS_Transaction {
    constructor(_id, field, prev, update, callback) {
        super();
        this.prev = prev;
        this.update = update;
        this.field = field;
        this._id = _id;
        this.updateFunction = callback;
    }
    async doTransaction() {
		const { data } = await this.updateFunction({ variables: { _id: this._id, field: this.field, value: this.update }});
		return data;
    }
    async undoTransaction() {
        const { data } = await this.updateFunction({ variables: { _id: this._id, field: this.field, value: this.prev }});
		return data;
    }
}

/*  Handles item reordering */
export class ReorderItems_Transaction extends jsTPS_Transaction {
    constructor(listID, itemID, dir, callback) {
        super();
        this.listID = listID;
        this.itemID = itemID;
		this.dir = dir;
		this.revDir = dir === 1 ? -1 : 1;
		this.updateFunction = callback;
	}

    async doTransaction() {
		const { data } = await this.updateFunction({ variables: { itemId: this.itemID, _id: this.listID, direction: this.dir }});
		return data;
    }

    async undoTransaction() {
		const {data} = await this.updateFunction({ variables: { itemId: this.itemID, _id: this.listID, direction: this.revDir }});
		return data;

    }
    
}

export class EditItem_Transaction extends jsTPS_Transaction {
	constructor(listID, itemID, field, prev, update, flag, callback) {
		super();
		this.listID = listID;
		this.itemID = itemID;
		this.field = field;
		this.prev = prev;
		this.update = update;
		this.flag = flag;
		this.updateFunction = callback;
	}	

	async doTransaction() {
		const { data } = await this.updateFunction({ 
				variables:{  itemId: this.itemID, _id: this.listID, 
							 field: this.field, value: this.update, 
							 flag: this.flag 
						  }
			});
		return data;
    }

    async undoTransaction() {
		const { data } = await this.updateFunction({ 
				variables:{  itemId: this.itemID, _id: this.listID, 
							field: this.field, value: this.prev, 
							flag: this.flag 
						  }
			});
		return data;

    }
}

/*  Handles create/delete of list items */
export class UpdateListItems_Transaction extends jsTPS_Transaction {
    // opcodes: 0 - delete, 1 - add 
    constructor(listID, itemID, item, opcode, index, addfunc, delfunc) {
        super();
        this.listID = listID;
		this.itemID = itemID;
		this.item = item;
        this.addFunction = addfunc;
        this.deleteFunction = delfunc;
        this.opcode = opcode;
        this.index = index;
    }
    async doTransaction() {
		let data;
        this.opcode === 0 ? { data } = await this.deleteFunction({
							variables: {itemId: this.itemID, _id: this.listID}})
						  : { data } = await this.addFunction({
							variables: {item: this.item, _id: this.listID, index: this.index}})  
		if(this.opcode !== 0) {
            this.item._id = this.itemID = data.addItem;
		}
		return data;
    }
    // Since delete/add are opposites, flip matching opcode
    async undoTransaction() {
		let data;
        this.opcode === 1 ? { data } = await this.deleteFunction({
							variables: {itemId: this.itemID, _id: this.listID}})
                          : { data } = await this.addFunction({
							variables: {item: this.item, _id: this.listID, index: this.index}})
		if(this.opcode !== 1) {
            this.item._id = this.itemID = data.addItem;
        }
		return data;
    }
}

export class UpdateList_Transaction extends jsTPS_Transaction {
    constructor(listId, unsortedList, sortedList, updateListFunc){
        super();
        this.listId = listId;
        this.unsortedList = unsortedList;
        this.sortedList = sortedList;
        this.updateFunction = updateListFunc;
        console.log("TPS: " + this.unsortedList);
        console.log("TPS: " + this.sortedList);
    }

    async doTransaction(){
        const { data } = await this.updateFunction({
            variables: {
                _id: this.listId, 
                todoIDs: this.sortedList
            }
        });
        //console.log(this.unsortedList);
    }

    async undoTransaction() {
        console.log("undoing sort");
        const { data } = await this.updateFunction({
            variables: {
                _id: this.listId, 
                todoIDs: this.unsortedList
            }
        });
    }
}


//-----------------------Main-JsTPS-starts-here----------------------------------------

export class jsTPS {
    constructor() {
        // THE TRANSACTION STACK
        this.transactions = [];
        // KEEPS TRACK OF WHERE WE ARE IN THE STACK, THUS AFFECTING WHAT
        // TRANSACTION MAY BE DONE OR UNDONE AT ANY GIVEN TIME
        this.mostRecentTransaction = -1;
        // THESE VARIABLES CAN BE TURNED ON AND OFF TO SIGNAL THAT
        // DO AND UNDO OPERATIONS ARE BEING PERFORMED
        this.performingDo = false;
        this.performingUndo = false;
    }
    
    /**
     * Tests to see if the do (i.e. redo) operation is currently being
     * performed. If it is, true is returned, if not, false.
     * 
     * return true if the do (i.e. redo) operation is currently in the
     * process of executing, false otherwise.
     */
    isPerformingDo() {
        return this.performingDo;
    }
    
    /**
     * Tests to see if the undo operation is currently being
     * performed. If it is, true is returned, if not, false.
     * 
     * return true if the undo operation is currently in the
     * process of executing, false otherwise.
     */
    isPerformingUndo() {
        return this.performingUndo;
    }
    
    /**
     * This function adds the transaction argument to the top of
     * the transaction processing system stack and then executes it. Note that it does
     * When this method has completed transaction will be at the top 
     * of the stack, it will have been completed, and the counter have
     * been moved accordingly.
     * 
     * param transaction The custom transaction to be added to
     * the transaction processing system stack and executed.
     */
    addTransaction(transaction) {
        // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
        // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
        if ((this.mostRecentTransaction < 0)|| (this.mostRecentTransaction < (this.transactions.length-1))) {
            for (let i = this.transactions.length-1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }

        // AND NOW ADD THE TRANSACTION
        this.transactions.push(transaction);
        // AND EXECUTE IT
        // this.doTransaction();        
    }

    /**
     * This function executes the transaction at the location of the counter,
     * then moving the TPS counter. Note that this may be the transaction
     * at the top of the TPS stack or somewhere in the middle (i.e. a redo).
     */
     async doTransaction() {
		let retVal;
        if (this.hasTransactionToRedo()) {   
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction+1];
			retVal = await transaction.doTransaction();
			this.mostRecentTransaction++;
			this.performingDo = false;
            
        }
        console.log('transactions: ' + this.getSize());
        console.log('redo transactions:' + this.getRedoSize());
        console.log('undo transactions:' + this.getUndoSize());
		console.log(' ')
		return retVal;
    }
    
    /**
     * This function checks to see if there is a transaction to undo. If there
     * is it will return it, if not, it will return null.
     * 
     * return The transaction that would be executed if undo is performed, if
     * there is no transaction to undo, null is returned.
     */
    peekUndo() {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        else
            return null;
    }
    
    /**
     * This function checks to see if there is a transaction to redo. If there
     * is it will return it, if not, it will return null.
     * 
     * return The transaction that would be executed if redo is performed, if
     * there is no transaction to undo, null is returned.
     */    
    peekDo() {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction+1];
        }
        else
            return null;
    }

    /**
     * This function gets the most recently executed transaction on the 
     * TPS stack and undoes it, moving the TPS counter accordingly.
     */
     async undoTransaction() {
		let retVal;
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
			retVal = await transaction.undoTransaction();
            this.mostRecentTransaction--;
			this.performingUndo = false;
        }
        console.log('transactions: ' + this.getSize());
        console.log('redo transactions:' + this.getRedoSize());
        console.log('undo transactions:' + this.getUndoSize());
        console.log(' ')
		return(retVal);
    }

    /**
     * This method clears all transactions from the TPS stack
     * and resets the counter that keeps track of the location
     * of the top of the stack.
     */
    clearAllTransactions() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions = [];
        
        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.mostRecentTransaction = -1;        
    }
    
    /**
     * Accessor method that returns the number of transactions currently
     * on the transaction stack. This includes those that may have been
     * done, undone, and redone.
     * 
     * return The number of transactions currently in the transaction stack.
     */
    getSize() {
        return this.transactions.length;
    }
    
    /**
     * This method returns the number of transactions currently in the
     * transaction stack that can be redone, meaning they have been added
     * and done, and then undone.
     * 
     * return The number of transactions in the stack that can be redone.
     */
    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    /**
     * This method returns the number of transactions currently in the 
     * transaction stack that can be undone.
     * 
     * return The number of transactions in the transaction stack that
     * can be undone.
     */
    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }
    
    /**
     * This method tests to see if there is a transaction on the stack that
     * can be undone at the time this function is called.
     * 
     * return true if an undo operation is possible, false otherwise.
     */
    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }
    
    /**
     * This method tests to see if there is a transaction on the stack that
     * can be redone at the time this function is called.
     * 
     * return true if a redo operation is possible, false otherwise.
     */
    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.length-1);
    }
        
    /**
     * This method builds and returns a textual summary of the current
     * Transaction Processing System, this includes the toString of
     * each transaction in the stack.
     * 
     * return A textual summary of the TPS.
     */
    // toString() {
    //     let text = "<br>" +"--Number of Transactions: " + this.transactions.length + "</br>";
    //     text += "<br>" + "--Current Index on Stack: " + this.mostRecentTransaction + "</br>";
    //     text += "<br>" + "--Current Transaction Stack:" + "</br>";
    //     for (let i = 0; i <= this.mostRecentTransaction; i++) {
    //         let jsT = this.transactions[i];
    //         text += "<br>" + "----" + jsT.toString() + "</br>";
    //     }
    //     return text;
    // }
}