'use strict'

class UserService {

    constructor(DAO) {
        this.DAO = DAO;
    }

    login = async (body) => {
        try {
            let user = await this.DAO.login(body.email, body.password);
            return {
                ok: true,
                status: 201,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };




    signup = async (body) => {
        try {
            let user = await this.DAO.signup(body.email, body.fullName, body.password, body.role, body.phoneNumber);
            return {
                ok: true,
                status: 201,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };





    // createSkuItem= async (RFID, SKUId, DateOfStock)=>{
    //     try{
    //         const response=await this.dao.createSKUItem(
    //             RFID,
    //             SKUId,
    //             DateOfStock,
    //         )
    //         return {
    //         ok: true,
    //         status: 201,
    //         }
    //     }catch(e){

    //         return {
    //         ok: false,
    //         status: e
    //         }
    //     }
    // }


    // constructor(dao) {
    //     this.dao = dao
    // }

    // getSkuItems=async ()=>{
    //     try {
    //         const skus = await this.dao.getSKUItems()
    //         const skuDTO = skus.map((r) => ({
    //             RFID: r.RFID,
    //             SKUId: r.SKUId,
    //             Available: r.Avaiable,
    //             DateOfStock: r.DateOfStock,
    //          }))
    //         return {
    //         ok: true,
    //         status: 200,
    //         body: skuDTO
    //         }
    //     } catch(e) {

    //         return {
    //         ok: false,
    //         status: 500
    //         }
    //     }
    // }

    // getSKUItemsById=async (id)=>{
    //     try {
    //         const skus=await this.dao.getSKUItemsById(id)
    //         const message = skus.map((r) => ({
    //             RFID: r.RFID,
    //             SKUId: r.SKUId,
    //             DateOfStock: r.DateOfStock,
    //          }))
    //         return {
    //         ok: true,
    //         status: 200,
    //         body: message
    //         }
    //     } catch(e) {

    //         return {
    //         ok: false,
    //         status: e
    //         }
    //     }
    // }

    // getSKUItemsByRfid=async (id)=>{
    //     try {
    //         const sku=await this.dao.getSKUItemsByRfid(id)
    //         const message = {
    //             RFID: sku.RFID,
    //             SKUId: sku.SKUId,
    //             Available: sku.Avaiable,
    //             DateOfStock: sku.DateOfStock,
    //          }
    //         return {
    //         ok: true,
    //         status: 200,
    //         body: message
    //         }
    //     } catch(e) {

    //         return {
    //         ok: false,
    //         status: e
    //         }
    //     }
    // }

    // createSkuItem= async (RFID, SKUId, DateOfStock)=>{
    //     try{
    //         const response=await this.dao.createSKUItem(
    //             RFID,
    //             SKUId,
    //             DateOfStock,
    //         )
    //         return {
    //         ok: true,
    //         status: 201,
    //         }
    //     }catch(e){

    //         return {
    //         ok: false,
    //         status: e
    //         }
    //     }
    // }

    // editSkuItem= async (oldRFID,RFID,available,DateOfStock)=>{
    //     try{
    //         const response=await this.dao.editSKUItem(
    //             oldRFID,
    //             RFID,
    //             available,
    //             DateOfStock
    //         )
    //         return {
    //         ok: true,
    //         status: 200,
    //         }
    //     }catch(e){

    //         if (e === 'id not found') {
    //             return{
    //                 ok: false,
    //                 status: 404
    //             }
    //         }
    //         return {
    //         ok: false,
    //         status: 503
    //         }
    //     }
    // }

    // deleteSkuItem= async (rfid)=>{
    //     try{
    //         const response=await this.dao.deleteSKUItem(
    //             rfid
    //         )
    //         return {
    //         ok: true,
    //         status: 204,
    //         }
    //     }catch(e){

    //         if (e === 'id not found') {
    //             return{
    //                 ok: false,
    //                 status: 404
    //             }
    //         }
    //         return {
    //         ok: false,
    //         status: 503
    //         }
    //     }
    // }
}

module.exports = UserService