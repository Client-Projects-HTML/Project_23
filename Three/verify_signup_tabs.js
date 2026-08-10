const fs = require('fs');

console.log('Verifying User / Admin tabs and social login removal in signup.html...\n');

const signupHtml = fs.readFileSync('signup.html', 'utf8');

// 1. Verify User and Admin tabs
if (signupHtml.includes('tabUserBtn') && signupHtml.includes('tabAdminBtn') && signupHtml.includes('switchSignUpType')) {
  console.log('SUCCESS: signup.html contains User Account and Admin Staff registration tabs!');
} else {
  console.error('ERROR: User or Admin tab missing from signup.html!');
}

// 2. Verify social signup removal
if (!signupHtml.includes('Or Sign Up With') && !signupHtml.includes('handleSocialLogin')) {
  console.log('SUCCESS: "OR SIGN UP WITH" divider and Google/Apple social buttons removed from signup.html!');
} else {
  console.error('ERROR: Social sign up divider or buttons still present in signup.html!');
}
