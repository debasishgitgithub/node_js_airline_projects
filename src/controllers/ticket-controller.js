const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { Airport } = require('../models');
const cityService = new CityService();


//  < ------- this is for WEB routes  ------- > //

async function generate_pdf(req, res, next) {
    try {
        const flight = {
            flightNumber: "AI-202",
            departure: "Kolkata",
            arrival: "Delhi",
            date: "10 April 2026"
        };

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Render EJS HTML
        const html = await new Promise((resolve, reject) => {
            req.app.render('ticket/ticket-updated', { flight }, (err, html) => {
                if (err) reject(err);
                else resolve(html);
            });
        });

        await page.setContent(html);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        // ✅ Save PDF
        const pdfDir = path.join(__dirname, '../../uploads/pdf');

        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        const filePath = path.join(pdfDir, `ticket-${Date.now()}.pdf`);
        fs.writeFileSync(filePath, pdfBuffer);
        
        // ✅ Send PDF to client
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=ticket.pdf', // use 'inline' to display in browser, 'attachment' to download
            // 'Content-Disposition': 'attachment; filename=ticket.pdf',
        });

        res.send(pdfBuffer);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    generate_pdf
}