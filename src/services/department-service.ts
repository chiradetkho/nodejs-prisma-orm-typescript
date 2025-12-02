import { Prisma } from "../generated/prisma/generate-client-db1/client";
import { prismaDb1 } from "../database/postgres";

export async function findAllDepartment() {
    return await prismaDb1.department.findMany({
        orderBy: { department_id: "desc" }
    });
}

export async function findManyByDepartmentName(name: string) {
    return await prismaDb1.department.findMany({
        where: {
            department_name: {
                contains: name
            }
        }
    });
}

export async function findAllDepartmentWithPagination(page: number = 1, pageSize: number = 3) {
    return await prismaDb1.department.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { department_id: "desc" }
    });
}

export async function findTotalRecordDepartment() {
    return await prismaDb1.department.count();
}

export async function findByIdDepartment(id: string) {
    return await prismaDb1.department.findUnique({
        where: { department_id: id }
    });
}

export async function createDepartment(data: Prisma.DepartmentCreateInput) {
    return await prismaDb1.department.create({
        data: data
    });
}

export async function createManyDepartment(data: Prisma.DepartmentCreateInput) {
    return await prismaDb1.department.createMany({
        data: data,
        skipDuplicates: true,
    });
}

export async function removeDepartment(id: string) {
    return await prismaDb1.department.delete({
        where: { department_id: id }
    });
}

export async function updateDepartment(id: string, data: Prisma.DepartmentUpdateInput) {
    return await prismaDb1.department.update({
        data: data,
        where: { department_id: id }
    });
}

export async function updateManyDepartment(data: Prisma.DepartmentUpdateInput) {
    return await prismaDb1.department.updateMany({
        where: {
            department_name: {
                contains: 'test'
            }
        },
        data: {
            department_name: data.department_name!
        }
    })
}

export async function testTransactionalService() {
    const [departments, totalDepartments] = await prismaDb1.$transaction([
        prismaDb1.department.findMany(),
        prismaDb1.department.count()
    ])

    return { departments, totalDepartments };
}

//ค้นหาด้วยชื่อ
export async function searchDepartment(name: string) {
    return await prismaDb1.department.findMany({
        where: {
            department_name: { contains: `${name}` }
        }
    });
}

// raw sql
export async function findAllDepartmentRaw() {
    return await prismaDb1.$queryRaw`select * from Department order by department_id desc`
}

// call store procudure (sql server)
// await prisma.$executeRaw`EXEC ชื่อ`