'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Find valid user ID (e.g. default seeded admin user) or fallback to 1
    let userId = 1;
    try {
      const [users] = await queryInterface.sequelize.query(
        'SELECT id FROM Users LIMIT 1;'
      );
      if (users && users.length > 0) {
        userId = users[0].id;
      }
    } catch (e) {
      userId = 1;
    }

    const titles = [
      'Asset Management Information System',
      'Facial Recognition Attendance Platform',
      'Interactive Campus E-Learning Portal',
      'IoT Temperature and Humidity Monitoring Service',
      'Multi-Vendor E-Commerce Hub for Local SMEs',
      'Supply Chain and Logistics Tracking Application',
      'Real-Time Network Anomaly Detection System',
      'Multi-Branch Sales and Inventory Analytics Dashboard',
      'AI-Powered Tourism and Itinerary Recommendation Engine',
      'Real-Time Clinic and Doctor Appointment Booking Suite',
      'Public Service Digital Grievance Portal',
      'Smart Warehouse and Stock Optimization Platform',
      'Integrated Agile Project Management Suite',
      'Computer Vision Fruit Ripeness Quality Inspector',
      'Digital Crowdfunding and Philanthropy Platform',
      'Urban Air Quality and Environmental Monitoring System',
      'SME Cloud Financial Accounting and Bookkeeping Application',
      'Corporate Meeting Room and Resource Reservation Portal',
      'Student Internship and Career Placement Hub',
      'Machine Learning Weather and Climate Forecasting Engine'
    ];

    const teamList = [
      'Team Alpha', 'Team Bravo', 'Team Charlie', 'Team Delta', 'Team Echo',
      'Team Falcon', 'Team Griffin', 'Team Hydra', 'Team Infinity', 'Team Jupiter',
      'CyberTech Squad', 'Dataverse Crew', 'ByteCraft Guild', 'Nexus Syndicate'
    ];

    const leaderList = [
      'Alexander Wright', 'Benjamin Hayes', 'Charlotte Miller', 'Daniel Cooper',
      'Ethan Brooks', 'Fiona Gallagher', 'George Clark', 'Hannah Scott',
      'Ian Vance', 'Jessica Taylor', 'Kevin Parker', 'Lucas Bennett',
      'Mason Mitchell', 'Natalie Evans', 'Oliver Hughes', 'Penelope Cruz',
      'Quentin Ross', 'Rachel Green', 'Samuel Collins', 'Victoria Adams'
    ];

    const managerList = [
      'Prof. Edward Harrison, Ph.D.',
      'Dr. Robert Jenkins, M.Sc.',
      'Dr. Sarah Mitchell, PMP',
      'Prof. Anthony Edwards, Ph.D.',
      'Michael Vance, M.Eng.',
      'Emily Watson, PMP',
      'David Sterling, M.Tech.'
    ];

    const laporans = [];
    const baseDate = new Date();

    for (let i = 1; i <= 5000; i++) {
      const titleTemplate = titles[(i - 1) % titles.length];
      const batchNumber = Math.floor((i - 1) / titles.length) + 1;
      const title = `${titleTemplate} #${batchNumber}`;

      const teamTemplate = teamList[(i - 1) % teamList.length];
      const divisionNumber = ((i * 3) % 12) + 1;
      const nama_kelompok = `${teamTemplate} Division ${divisionNumber}`;

      const leaderTemplate = leaderList[(i - 1) % leaderList.length];
      const nama_ketua = `${leaderTemplate} (${i})`;

      const nama_manpro = managerList[(i - 1) % managerList.length];

      // Stagger createdAt timestamp over time for realistic data distribution
      const createdAt = new Date(baseDate.getTime() - (5000 - i) * 60000);

      laporans.push({
        title,
        nama_kelompok,
        nama_ketua,
        nama_manpro,
        laporan: 'Images/1671115004058.png',
        userId,
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Insert in chunks of 1000 items to avoid MySQL max_allowed_packet limits
    const chunkSize = 1000;
    for (let i = 0; i < laporans.length; i += chunkSize) {
      const chunk = laporans.slice(i, i + chunkSize);
      await queryInterface.bulkInsert('Laporans', chunk, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Laporans', null, {});
  },
};
