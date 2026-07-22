const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface RequestServiceData {
  service: string;
  currency: string;
  budget: string;
  name: string;
  email: string;
  details: string;
}

export async function sendRequestEmail(data: RequestServiceData) {
  const apiKey = process.env.BREVO_API_KEY;
  const recipient = process.env.BREVO_RECIPIENT;

  if (!apiKey || !recipient) {
    throw new Error("Brevo API key or recipient email not configured");
  }

  const budgetDisplay = data.budget
    ? `${data.currency} ${Number(data.budget).toLocaleString()}`
    : "Not specified";

  const htmlContent = [
    "<!DOCTYPE html>",
    '<html><head><style>',
    "body{font-family:Arial,sans-serif;background:#0a0a0a;color:#ededed;padding:20px}",
    ".container{max-width:600px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden}",
    ".header{background:linear-gradient(135deg,#1DB954,#17a348);padding:24px;text-align:center}",
    ".header h1{color:#0a0a0a;margin:0;font-size:20px;font-weight:700}",
    ".body{padding:24px}",
    ".field{margin-bottom:16px}",
    ".label{color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}",
    ".value{color:#ededed;font-size:16px;padding:8px 12px;background:#1a1a1a;border-radius:6px}",
    ".divider{border:none;border-top:1px solid #1a1a1a;margin:20px 0}",
    ".footer{padding:16px 24px;background:#0a0a0a;text-align:center;color:#888;font-size:12px}",
    "</style></head><body>",
    '<div class="container">',
    '<div class="header"><h1>New Service Request</h1></div>',
    '<div class="body">',
    '<div class="field"><div class="label">Service</div><div class="value">' + data.service + '</div></div>',
    '<div class="field"><div class="label">Proposed Budget</div><div class="value">' + budgetDisplay + '</div></div>',
    '<div class="field"><div class="label">Client Name</div><div class="value">' + data.name + '</div></div>',
    '<div class="field"><div class="label">Client Email</div><div class="value">' + data.email + '</div></div>',
    '<hr class="divider">',
    '<div class="field"><div class="label">Project Details</div><div class="value">' + data.details.replace(/\n/g, "<br>") + '</div></div>',
    "</div>",
    '<div class="footer">Kortix Digital — Service Request System</div>',
    "</div></body></html>",
  ].join("\n");

  const payload = {
    sender: { email: "noreply@kortixdigital.com", name: "Kortix Digital" },
    to: [{ email: recipient }],
    replyTo: { email: data.email, name: data.name },
    subject: `New Service Request — ${data.service}`,
    htmlContent,
  };

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
  }

  return { success: true };
}
