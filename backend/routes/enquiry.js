import { z } from "zod";
import { connect, getCollection } from "../lib/mongodb.js";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dns from "dns/promises";

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from backend and root folders to support multiple start scripts and environments
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Environment diagnostic logs for production troubleshooting
(function checkEnvironment() {
  console.log("--- Production Enquiry Environment Diagnostics ---");
  const keysToCheck = [
    "RESEND_API_KEY",
    "resend_api",
    "EMAIL_DESTINATION",
    "email",
    "MONGODB_URI",
    "NODE_ENV"
  ];
  keysToCheck.forEach(key => {
    const val = process.env[key];
    if (val) {
      let displayVal = "defined";
      if (key === "EMAIL_DESTINATION" || key === "email") {
        displayVal = val;
      } else if (key === "MONGODB_URI" || key === "RESEND_API_KEY" || key === "resend_api") {
        displayVal = val.slice(0, 5) + "..." + val.slice(-4);
      }
      console.log(`Environment key [${key}]: ${displayVal}`);
    } else {
      console.log(`Environment key [${key}]: NOT DEFINED`);
    }
  });
  console.log("-------------------------------------------------");
})();

let _resend;
function getResend() {
  if (!_resend) {
    const apiKey = (process.env.RESEND_API_KEY || process.env.resend_api || "").trim();
    if (!apiKey) {
      console.warn("Resend WARNING: Neither RESEND_API_KEY nor resend_api is defined in environment variables!");
      return null;
    }
    console.log("Resend: Initializing Resend SDK...");
    _resend = new Resend(apiKey);
    console.log("Resend: SDK initialized successfully.");
  }
  return _resend;
}

const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s\-()]/g, "").replace(/^\+?91/, ""))
  .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile");

const Schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: phoneSchema,
  email: z.string().trim().email().max(160),
  budget: z.string().max(40).optional().nullable(),
  location: z.string().trim().max(120).optional().nullable(),
  project_id: z.union([z.string(), z.number()]).optional().nullable(),
  project_name: z.string().max(160).optional().nullable(),
  message: z.string().max(2e3).optional().nullable(),
  source: z.string().max(40).optional().default("website"),
});

export const handleEnquiry = async (req, res) => {
  try {
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) {
      console.log("Validation failed:", parsed.error.flatten().fieldErrors);
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    const userAgent = req.headers["user-agent"]?.slice(0, 300) ?? null;

    // Ensure MongoDB is connected (safe re-entrant — returns existing db if already connected)
    await connect();

    const enquiries = getCollection("enquiries");
    await enquiries.insertOne({
      name: data.name,
      phone: `+91${data.phone}`,
      email: data.email,
      budget: data.budget ?? null,
      location: data.location ?? null,
      project_id: data.project_id != null ? String(data.project_id) : null,
      project_name: data.project_name ?? null,
      message: data.message ?? null,
      source: data.source ?? "website",
      user_agent: userAgent,
      created_at: new Date(),
    });
    console.log(`Enquiry saved: ${data.name} (${data.phone})`);

    // Send email via Resend with fallback check for root .env spelling
    const destinationEmail = (process.env.EMAIL_DESTINATION || process.env.email || "").trim();
    console.log(`Resend: Attempting to send enquiry email...`);
    console.log(`Resend: Destination email is resolved as: "${destinationEmail}"`);

    if (destinationEmail) {
      const resend = getResend();
      if (resend) {
        try {
          const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
          const emailPayload = {
            from: "onboarding@resend.dev",
            to: [destinationEmail],
            subject: `New Property Enquiry: ${data.name}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    background-color: #f8fafc;
                    color: #334155;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                  }
                  .wrapper {
                    width: 100%;
                    background-color: #f8fafc;
                    padding: 40px 20px;
                    box-sizing: border-box;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e2e8f0;
                  }
                  .header {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #ffffff;
                    padding: 35px 40px;
                    text-align: center;
                  }
                  .header h1 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: -0.025em;
                    color: #f8fafc;
                  }
                  .header p {
                    margin: 5px 0 0 0;
                    font-size: 14px;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  }
                  .content {
                    padding: 40px;
                  }
                  .lead-text {
                    font-size: 16px;
                    line-height: 24px;
                    color: #475569;
                    margin-bottom: 30px;
                  }
                  .details-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin-bottom: 30px;
                  }
                  .details-table tr:first-child td {
                    border-top: 1px solid #e2e8f0;
                  }
                  .details-table td {
                    padding: 16px 20px;
                    border-bottom: 1px solid #e2e8f0;
                    font-size: 15px;
                    vertical-align: top;
                  }
                  .label {
                    font-weight: 600;
                    color: #0f172a;
                    width: 35%;
                    background-color: #f8fafc;
                  }
                  .value {
                    color: #334155;
                  }
                  .message-box {
                    background-color: #f1f5f9;
                    border-left: 4px solid #10b981;
                    padding: 20px;
                    border-radius: 0 8px 8px 0;
                    font-size: 15px;
                    line-height: 1.6;
                    color: #334155;
                    margin-top: 5px;
                    font-style: italic;
                  }
                  .footer {
                    background-color: #f1f5f9;
                    padding: 25px 40px;
                    text-align: center;
                    border-top: 1px solid #e2e8f0;
                  }
                  .footer p {
                    margin: 0;
                    font-size: 12px;
                    color: #64748b;
                  }
                  .footer a {
                    color: #10b981;
                    text-decoration: none;
                  }
                </style>
              </head>
              <body>
                <div class="wrapper">
                  <div class="container">
                    <div class="header">
                      <h1>New Property Enquiry</h1>
                      <p>Octopus Consulting Portal</p>
                    </div>
                    <div class="content">
                      <p class="lead-text">A new enquiry has been submitted. Here are the details of the customer:</p>
                      <table class="details-table">
                        <tr>
                          <td class="label">Customer Name</td>
                          <td class="value"><strong>${data.name}</strong></td>
                        </tr>
                        <tr>
                          <td class="label">Email Address</td>
                          <td class="value"><a href="mailto:${data.email}" style="color: #10b981; text-decoration: none;">${data.email}</a></td>
                        </tr>
                        <tr>
                          <td class="label">Phone Number</td>
                          <td class="value"><a href="tel:+91${data.phone}" style="color: #10b981; text-decoration: none;">+91 ${data.phone}</a></td>
                        </tr>
                        <tr>
                          <td class="label">Project Interest</td>
                          <td class="value">${data.project_name ?? "General Inquiry"}</td>
                        </tr>
                        <tr>
                          <td class="label">Preferred Location</td>
                          <td class="value">${data.location ?? "Not specified"}</td>
                        </tr>
                        <tr>
                          <td class="label">Estimated Budget</td>
                          <td class="value">${data.budget ?? "Not specified"}</td>
                        </tr>
                        <tr>
                          <td class="label">Submission Date</td>
                          <td class="value">${timestamp} (IST)</td>
                        </tr>
                        <tr>
                          <td class="label" style="border-bottom: none;">Message</td>
                          <td class="value" style="border-bottom: none;">
                            ${data.message ? `<div class="message-box">${data.message}</div>` : `<span style="color: #94a3b8; font-style: italic;">No message provided</span>`}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div class="footer">
                      <p>&copy; ${new Date().getFullYear()} Octopus Consulting. All rights reserved.</p>
                      <p style="margin-top: 5px; font-size: 11px;">This is an automated notification from your website's contact form pipeline.</p>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `,
          };

          console.log("Resend: Sending email with payload:", JSON.stringify({
            ...emailPayload,
            html: "[HTML Content Truncated for Log]"
          }, null, 2));

          const { data: emailData, error } = await resend.emails.send(emailPayload);

          if (error) {
            console.error("Resend: Email send failure occurred!");
            console.error("Resend Error Details:", JSON.stringify(error, null, 2));
          } else {
            console.log("Resend: Email sent successfully!");
            console.log("Resend Response Payload:", JSON.stringify(emailData, null, 2));
          }
        } catch (emailErr) {
          console.error("Resend: Critical SDK/Network error occurred during send:", emailErr.message);
          if (emailErr.stack) {
            console.error(emailErr.stack);
          }
        }
      } else {
        console.warn("Resend skipped — Resend SDK could not be initialized (missing API key).");
      }
    } else {
      console.warn("Resend skipped — EMAIL_DESTINATION is missing in environment variables.");
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Enquiry handler error:", error.message);
    return res.status(500).json({ ok: false, error: "Could not save enquiry" });
  }
};

export const handleDebugEmail = async (req, res) => {
  const diagnostics = {};
  
  // 1. Resolve credentials
  const apiKey = (process.env.RESEND_API_KEY || process.env.resend_api || "").trim();
  const destinationEmail = (process.env.EMAIL_DESTINATION || process.env.email || "").trim();

  diagnostics.env = {
    RESEND_API_KEY: apiKey ? `defined (prefix: ${apiKey.slice(0, 5)}... suffix: ${apiKey.slice(-4)})` : "NOT_DEFINED",
    resend_api: process.env.resend_api ? `defined (prefix: ${process.env.resend_api.slice(0, 5)}... suffix: ${process.env.resend_api.slice(-4)})` : "NOT_DEFINED",
    EMAIL_DESTINATION: destinationEmail || "NOT_DEFINED",
    email: process.env.email || "NOT_DEFINED",
    MONGODB_URI: process.env.MONGODB_URI ? "defined" : "NOT_DEFINED",
    NODE_ENV: process.env.NODE_ENV || "NOT_DEFINED",
  };

  // 2. DNS resolution tests
  try {
    const lookup = await dns.lookup("api.resend.com");
    diagnostics.dnsLookup = { success: true, address: lookup.address, family: lookup.family };
  } catch (err) {
    diagnostics.dnsLookup = { success: false, error: err.message };
  }

  try {
    const resolve = await dns.resolve4("api.resend.com");
    diagnostics.dnsResolve = { success: true, ips: resolve };
  } catch (err) {
    diagnostics.dnsResolve = { success: false, error: err.message };
  }

  // 3. Direct API fetch (HTTP Layer Connection Test)
  if (apiKey) {
    try {
      const fetchRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [destinationEmail || "gkr2602@gmail.com"],
          subject: "Debug: Connection & Sandbox Test via Fetch",
          html: "<p>This is a direct API fetch debug email from Octopus Backend.</p>"
        })
      });
      const fetchStatus = fetchRes.status;
      const fetchText = await fetchRes.text();
      let fetchJson;
      try {
        fetchJson = JSON.parse(fetchText);
      } catch (_) {
        fetchJson = fetchText;
      }
      diagnostics.directFetchTest = {
        status: fetchStatus,
        response: fetchJson
      };
    } catch (err) {
      diagnostics.directFetchTest = { success: false, error: err.message, stack: err.stack };
    }
  } else {
    diagnostics.directFetchTest = { success: false, error: "Skipped: No API key available" };
  }

  // 4. Resend SDK Test
  const resend = getResend();
  if (!resend) {
    diagnostics.resendSdk = { success: false, error: "SDK could not be initialized (missing API key)" };
  } else {
    try {
      const emailPayload = {
        from: "onboarding@resend.dev",
        to: [destinationEmail || "gkr2602@gmail.com"],
        subject: "Debug Test Email (SDK)",
        html: "<p>This is a testing email from the Resend SDK.</p>"
      };
      const result = await resend.emails.send(emailPayload);
      diagnostics.resendSdk = { success: true, ...result };
    } catch (err) {
      diagnostics.resendSdk = { success: false, error: err.message, stack: err.stack };
    }
  }

  return res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    diagnostics
  });
};
