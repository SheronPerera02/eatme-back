import { faker } from "@faker-js/faker";
import db from "../config/db";
import { OrderStatus } from "../enum";

export const seedsOrders = async () => {
  const statuses = [
    OrderStatus.complete,
    OrderStatus.processing,
    OrderStatus.pending,
  ];

  try {
    const numItemsToCreate = 20;

    for (let i = 0; i < numItemsToCreate; i++) {
      await db.item.findOrCreate({
        where: {
          name: faker.commerce.productName(),
          price: faker.number.int({ min: 1, max: 1000 }),
        },
      });
    }

    const user = await db.user.findByPk(1);
    if (!user) {
      throw new Error("User with ID 1 not found!");
    }

    // Generate orders
    for (let i = 0; i < 100; i++) {
      const order = await db.order.create({
        date: faker.date.past(),
        status: faker.helpers.arrayElement(statuses) as OrderStatus,
        userId: user.getDataValue("id"),
      });

      const numItems = faker.number.int({ min: 1, max: 5 });

      for (let j = 0; j < numItems; j++) {
        const randomItemId = faker.number.int({
          min: 1,
          max: numItemsToCreate,
        });
        const item = await db.item.findByPk(randomItemId);
        if (item) {
          const existingOrderItem = await db.orderItem.findOne({
            where: {
              orderId: order.getDataValue("id"),
              itemId: item.getDataValue("id"),
            },
          });

          if (!existingOrderItem) {
            await db.orderItem.create({
              orderId: order.getDataValue("id"),
              itemId: item.getDataValue("id"),
              quantity: faker.number.int({ min: 1, max: 10 }),
            });
          }
        }
      }
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding orders:", error);
  }
};
