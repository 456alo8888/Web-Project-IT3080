import { Op } from 'sequelize';
import db from '../models/index.js';

const { Fee, Bill, Receipt, Resident, Room, sequelize, Sequelize } = db

// Helper function to get total fee count
async function getTotalFeeCount() {
  return await Fee.count();
}

// Helper function to get total fee finished count
async function getTotalFeeFinished() {
  return await Fee.count({
    where: {
      paidCount: {
        [Op.gte]: sequelize.col('house_count'),
      },
    },
  });
}

// Helper function to get yearly fee count
async function getYearlyFeeCount() {
  const currentYear = new Date().getFullYear();
  return await Fee.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(`${currentYear}-01-01`),
        [Op.lt]: new Date(`${currentYear + 1}-01-01`),
      },
    },
  });
}

// Helper function to get yearly fee finished count
async function getYearlyFeeFinished() {
  const currentYear = new Date().getFullYear();
  return await Fee.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(`${currentYear}-01-01`),
        [Op.lt]: new Date(`${currentYear + 1}-01-01`),
      },
      paidCount: {
        [Op.gte]: sequelize.col('house_count'),
      },
    }
  });
}

// Helper function to get monthly fee count
async function getMonthlyFeeCount() {
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  return await Fee.count({
    where: {
      createdAt: {
        [Op.gte]: currentMonthStart,
        [Op.lt]: currentMonthEnd,
      },
    },
  });
}

// Helper function to get monthly fee finished count
async function getMonthlyFeeFinished() {
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  return await Fee.count({
    where: {
      createdAt: {
        [Op.gte]: currentMonthStart,
        [Op.lt]: currentMonthEnd,
      },
      paidCount: {
        [Op.gte]: sequelize.col('house_count'),
      },
    },
  });
}

// Helper function to get resident count (distinct by residentId)
async function getResidentCount() {
  return await Resident.count();
}

// Helper function to get finished room count
async function getFinishedRoomCount() {
  return -1;
}

// Helper function to get non-finished room count
async function getNonFinishedRoomCount() {
  return await Room.count({
    include: [{
      model: Bill,
      required: true, // This ensures room has at least one bill
      where: {
        // Find bills that don't have any receipts
        id: {
          [Op.notIn]: Sequelize.literal(
            '(SELECT bill_id FROM receipts)'
          )
        }
      }
    }]
  });
}

// Helper function to get top monthly fees
async function getTopMonthlyFees() {
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  const topMonthlyFees = await Fee.findAll({
    attributes: [
      'id',
      'name',
      [
        Sequelize.fn(
          'COUNT',
          Sequelize.col('Bills.Receipt.id')
        ),
        'activityCount'
      ]
    ],
    include: [{
      model: Bill,
      as: 'Bills',
      attributes: [], // We don't need Bill fields
      required: false, // Left join to include fees even with no bills
      include: [{
        model: Receipt,
        as: 'Receipt',
        attributes: [], // We don't need Receipt fields
        required: false, // Left join to include bills even with no receipts
        where: {
          createdAt: {
            [Op.between]: [currentMonthStart, currentMonthEnd]
          }
        }
      }]
    }],
    group: ['Fee.id', 'Fee.name'], // Group by fee to count receipts
    order: [
      [Sequelize.literal('activityCount'), 'DESC']
    ],
    limit: 3,
    subQuery: false // Important for some databases to handle limit with aggregates
  });

  return topMonthlyFees.map(fee => ({
    id: fee.id,
    name: fee.name,
    paymentCount: fee.activityCount ?? 0,
  }));
}

// Main function to get the API response data
export async function getFeeStatistics(req, res) {
  try {
    const totalFeeCount = await getTotalFeeCount();
    const totalFeeFinished = await getTotalFeeFinished();
    const yearlyFeeCount = await getYearlyFeeCount();
    const yearlyFeeFinished = await getYearlyFeeFinished();
    const monthlyFeeCount = await getMonthlyFeeCount();
    const monthlyFeeFinished = await getMonthlyFeeFinished();
    const residentCount = await getResidentCount();
    const finishedRoomCount = await getFinishedRoomCount();
    const nonFinishedRoomCount = await getNonFinishedRoomCount();
    const topMonthlyFees = await getTopMonthlyFees();

    const response = {
      totalFeeCount,
      totalFeeFinished,
      yearlyFeeCount,
      yearlyFeeFinished,
      monthlyFeeCount,
      monthlyFeeFinished,
      residentCount,
      finishedRoomCount,
      nonFinishedRoomCount,
      topMonthlyFees,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching fee statistics:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
}
