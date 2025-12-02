import express from "express";
import { create, findManyByName, index, remove, search, show, testTransactionalController, update, updateMany } from "../controllers/department-controller";
import { asyncHandler } from "../middlewares/async-handler";

const router = express.Router();

//localhost:4000/api/v1/department/search?name=จิตเวช
router.get("/search", asyncHandler(search));

//localhost:4000/api/v1/department/
router.get("/", asyncHandler(index));

//localhost:4000/api/v1/department/update-many-by-name/:name
router.get("/find-many-by-name/:name", asyncHandler(findManyByName));

//localhost:4000/api/v1/department/
router.post("/", asyncHandler(create));


//localhost:4000/api/v1/department/update-many-by-name/:name
router.put("/update-many-by-name/:name", asyncHandler(updateMany));

router.get("/test-test", asyncHandler(testTransactionalController));

//localhost:4000/api/v1/department/5
router.get("/:id", asyncHandler(show));

//localhost:4000/api/v1/department/5
router.put("/:id", asyncHandler(update));

//localhost:4000/api/v1/department/5
router.delete("/:id", asyncHandler(remove));




export default router;