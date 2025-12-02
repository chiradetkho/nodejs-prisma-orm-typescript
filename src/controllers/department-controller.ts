import { NextFunction, Request, Response } from "express";
import {
  createDepartment,
  createManyDepartment,
  findAllDepartmentWithPagination,
  findByIdDepartment,
  findManyByDepartmentName,
  findTotalRecordDepartment,
  removeDepartment,
  searchDepartment,
  testTransactionalService,
  updateDepartment,
  updateManyDepartment,

} from "../services/department-service";
import { prismaDb1 } from "../database/postgres";
import { Prisma } from "../generated/prisma/generate-client-db1/client";
import { count } from "console";

// localhost:4000/api/v1/department?page=1&pageSize=3
export async function index(req: Request, res: Response) {
  const { page, pageSize } = req.query;
  const department = await findAllDepartmentWithPagination(Number(page), Number(pageSize));
  const totalRecord = await findTotalRecordDepartment();
  return res.status(200).json({
    total_record: totalRecord,
    data: department,
  });
}

export async function create(req: Request, res: Response) {
  // const jsonBody = req.body as Prisma.DepartmentCreateInput;
  // console.log(jsonBody);
  const jsonBody = req.body as Prisma.DepartmentCreateManyInput
  const DepartmentNewRecord = await createManyDepartment(jsonBody);
  return res.status(201).json({
    message: "เพิ่มข้อมูลสำเร็จ",
    data: DepartmentNewRecord,
  });
}


export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const department = await findByIdDepartment(id!);
    if (!department) {
      const error: any = Error("ไม่พบข้อมูล");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(department);
  } catch (error) {
    next(error);
  }
}


export async function findManyByName(req: Request, res: Response) {

  const { name } = req.params;
  const jsonbody = req.body as Prisma.DepartmentUpdateInput[];
  const result = await findManyByDepartmentName(name!);
  if (result.length === 0) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }
  return res.status(200).json({
    message: "แก้ไขข้อมูลสำเร็จ",
    count: result.length,
    data: result
  });
}



export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const department = await findByIdDepartment(id!);
  if (!department) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }

  const jsonBody = req.body as Prisma.DepartmentUpdateInput;
  const updatedDepartment = await updateDepartment(id!, jsonBody);

  return res
    .status(200)
    .json({ message: "แก้ไขข้อมูลสำเร็จ", data: updatedDepartment });
}

export async function updateMany(req: Request, res: Response) {

  const { name } = req.params;
  const jsonbody = req.body as Prisma.DepartmentUpdateInput;
  const departmentsToUpdate = await findManyByDepartmentName(name!);
  if (departmentsToUpdate.length === 0) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }

  const result = await updateManyDepartment(jsonbody);
  return res.status(200).json({
    message: "แก้ไขข้อมูลสำเร็จ",
    updatedCount: result.count,
    updatedDepartments: departmentsToUpdate
  });
}

export async function testTransactionalController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await testTransactionalService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const department = await findByIdDepartment(id!);
    if (!department) {
      return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
    }
    await removeDepartment(id!);
    return res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    next(error);
  }
}

export async function search(req: Request, res: Response) {
  const { name } = req.query as any;
  const result = await searchDepartment(name);
  // custom model method
  // const result = await prisma1.department.searchDepartmentByName(name);
  if (result.length == 0) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }
  return res.status(200).json(result);
}