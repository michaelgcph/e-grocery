﻿var BUDGET = 'budget-';var LS_KEY_PRODUCT_LIST = 'products';var LS_KEY_STORE_LIST = 'stores';// setupfunction setupStorage(){    e_log('setupStorage()');        // init products    if(localStorage.getItem(LS_KEY_PRODUCT_LIST)){        e_log('setupStorage() - existing setup');    }    else{        e_log('setupStorage() - setting up test products...');                var arrProducts = new Array(1);        var index = -1;                index++;        var objProduct = new Object();        objProduct.id = index;        objProduct.name = 'Haha';        objProduct.price = 10;        objProduct.remarks = 'test product ' + index;        arrProducts[index] = objProduct;                index++;        objProduct = new Object();        objProduct.id = index;        objProduct.name = 'Haha';        objProduct.price = 10;        objProduct.remarks = 'test product ' + index;        arrProducts[index] = objProduct;                e_log('setupStorage() - clearing localstorage...');        localStorage.clear();                e_log('setupStorage() - loading data into localstorage...');        e_log('setupStorage() - storing: ' + JSON.stringify(arrProducts));        localStorage.setItem(LS_KEY_PRODUCT_LIST, JSON.stringify(arrProducts));    }}function storage_getProducts(){    e_log('storage_getProducts()');        return JSON.parse(localStorage.getItem(LS_KEY_PRODUCT_LIST));}function storage_addProduct(sName, sPrice, sRemarks, barCode, barCodeType){    e_log('storage_addProduct()');    var objProduct = new Object();    var nPrice = parseFloat(sPrice);        // generate index (length + 1)    var arrProducts = storage_getProducts();    objProduct.id = arrProducts.length;    objProduct.name = sName;    objProduct.price = nPrice;    objProduct.remarks = sRemarks;    objProduct.barcode = barCode;    objProduct.barcode_type = barCodeType;        arrProducts[objProduct.id] = objProduct;    localStorage.setItem(LS_KEY_PRODUCT_LIST, JSON.stringify(arrProducts));}function storage_removeAllProducts(){    e_log('storage_removeAllProducts()');        var arrProducts = storage_getProducts();    arrProducts.splice(0, arrProducts.length);        e_log('storage_removeAllProducts() - after clearing... ' + JSON.stringify(arrProducts));    localStorage.setItem(LS_KEY_PRODUCT_LIST, JSON.stringify(arrProducts));}function storage_RefreshList_UL(element_id){    e_log('storage_RefreshList_UL()');    e_log('storage_RefreshList_UL() - element_id: ' + element_id);    $('#' + element_id).empty();        try{        var arrProducts = storage_getProducts();        e_log('storage_RefreshList_UL() - total products stored currently: ' + arrProducts.length);        if(arrProducts.length > 0){            var sItemList = "<ul id='ul_item_list' data-role='listview'>";            var sTempLI = '';            for(var i = 0; i < arrProducts.length; i++){                // append item details                sTempLI = '<li>';                sTempLI = sTempLI + '<h2>' + arrProducts[i].name + ' ... $' + arrProducts[i].price + '</h2>';                sTempLI = sTempLI + '<p>' + arrProducts[i].remarks + '</p>';                sTempLI = sTempLI + '</li>';                                sItemList = sItemList + sTempLI;            }                        sItemList = sItemList + '</ul>';            $('#' + element_id).append(sItemList);            $('#' + element_id).trigger('create');                                   e_log('storage_RefreshList_UL() - finished creating listview...');                    }        else{            $('#' + element_id).append("<ul id='ul_item_list' data-role='listview'><li>(no item)</li></ul>");            $('#' + element_id).trigger('create');        }    }catch(err){         e_error('error: ' + err.description);    }}// Storesfunction storage_addStore(objStore){    e_log('storage_addStore()');        var arrStores = storage_getStores();    if(arrStores != null){        e_log('storage_addStore() - current store count before adding... ' + arrStores.length);                objStore.id = arrStores.length;    }    else{        e_log('storage_addStore() - first store added... ' + objStore);                arrStores = new Array(1);        objStore.id = 0;    }        arrStores[objStore.id] = objStore;    localStorage.setItem(LS_KEY_STORE_LIST, JSON.stringify(arrStores));}function storage_getStores(){    e_log('storage_getStores()');        var obj = JSON.parse(localStorage.getItem(LS_KEY_STORE_LIST), '');    e_log('storage_getStores() object retrieved... ' + obj);        return obj;}function storage_removeAllStores(){    e_log('storage_removeAllStores()');        var arrStores = storage_getStores();    arrStores.splice(0, arrStores.length);        e_log('after clearing... ' + JSON.stringify(arrStores));    localStorage.setItem(LS_KEY_STORE_LIST, JSON.stringify(arrStores));}function storage_RefreshList_Stores(element_id){    e_log('storage_RefreshList_Stores()');        e_log('storage_RefreshList_Stores() - element_id to refresh: ' + element_id);    $('#' + element_id).empty();        try{        var arrStores = storage_getStores();        if(arrStores != null && arrStores.length > 0){            e_log('storage_RefreshList_Stores() current total... ' + arrStores.length);            var sItemList = "<ul id='ul_store_list' data-role='listview'>";            var sTempLI = '';            for(var i = 0; i < arrStores.length; i++){                                // append item details                sTempLI = '<li>';                sTempLI = sTempLI + '<h2>' + arrStores[i].name + '</h2>';                sTempLI = sTempLI + '<p>' + arrStores[i].remarks + '</p>';                sTempLI = sTempLI + '</li>';                                sItemList = sItemList + sTempLI;            }                        sItemList = sItemList + '</ul>';            $('#' + element_id).append(sItemList);            $('#' + element_id).trigger('create');                                   e_log('storage_RefreshList_Stores() - successfully created listview...');                    }        else{            $('#' + element_id).append("<ul id='ul_store_list' data-role='listview'><li>(no store)</li></ul>");            $('#' + element_id).trigger('create');        }    }catch(err){         e_error('error: ' + err.description);    }}// Budgetfunction storage_budget_saveBudget(sYYYYMM, sAmount){    e_log('storage_budget_saveBudget()');        var boolStatus = false;    try{        var nAmount = parseFloat(sAmount);        localStorage.setItem(BUDGET + sYYYYMM, nAmount);        boolStatus = true;    }    catch(err){        console.error('storage_budget_saveBudget() - ' + err.description);        e_error('Error: ' + err.description);    }        return boolStatus;}function storage_budget_retrieveBudget(sYYYYMM){    e_log('storage_budget_retrieveBudget()');        return parseFloat(localStorage.getItem(BUDGET + sYYYYMM));}// for Querying....function getTotalMoneySpent(){    return 98;}function getTotalBudget(){    return 99;}