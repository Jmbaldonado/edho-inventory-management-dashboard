import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { Expense } from './entities/expense.entity';
import { ExpenseByCategory } from './entities/expenseByCategory.entity';
import { ExpenseSummary } from './entities/expenseSummary.entity';
import { Product } from './entities/product.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseSummary } from './entities/purchaseSummary.entity';
import { Sale } from './entities/sale.entity';
import { SaleSummary } from './entities/saleSummary.entity';
import { User } from './entities/user.entity';

const fileEntityMap = {
    expenses: Expense,
    expenseByCategory: ExpenseByCategory,
    expenseSummary: ExpenseSummary,
    products: Product,
    purchases: Purchase,
    purchaseSummary: PurchaseSummary,
    sales: Sale,
    salesSummary: SaleSummary,
    users: User,
};

async function deleteAllData(
    orderedFileNames: string[],
    dataSource: DataSource,
) {
    for (const fileName of orderedFileNames) {
        const modelName = path.basename(fileName, path.extname(fileName));

        const entity = fileEntityMap[modelName];
        if (!entity) {
            console.error(`Entity not found for ${modelName}. Skipping...`);
        }

        const repository = dataSource.getRepository(entity);
        await repository.query(
            `TRUNCATE TABLE ${repository.metadata.tableName} CASCADE`,
        );

        console.info(`Deleted all data for ${modelName}`);
    }
}

async function main() {
    const dataDir = path.join(__dirname, 'seedData');

    const dataSource = await AppDataSource.initialize();
    console.info('Data source initialized');

    const orderedFileNames = [
        'products.json',
        'expenseSummary.json',
        'sales.json',
        'salesSummary.json',
        'purchases.json',
        'purchaseSummary.json',
        'expenses.json',
        'expenseByCategory.json',
        'users.json',
    ];

    await deleteAllData(orderedFileNames, dataSource);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDir, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const modelName = path.basename(fileName, path.extname(fileName));

        const entity = fileEntityMap[modelName];

        if (!entity) {
            console.error(`Entity not found for ${modelName}. Skipping...`);
        }

        const repository = dataSource.getRepository(entity);
        for (const data of jsonData) {
            await repository.save(data);
        }

        console.info(`Data seeded for ${modelName}`);
    }

    await dataSource.destroy();
    console.info('Database connection closed. Exiting...');
}

main().catch((error) => {
    console.error(
        'Error seeding data: ',
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
    );
    process.exit(1);
});
