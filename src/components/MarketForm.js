import React, { useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Input, 
  Button, 
  Grid, 
  Select, 
  MenuItem, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CountryList from 'react-select-country-list';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './MarketForm.css'; // Custom CSS for Ant Design

const { Dragger } = Upload;

const MarketForm = () => {
  const [country, setCountry] = useState('');
  const [marketName, setMarketName] = useState('');
  const [marketType, setMarketType] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [website, setWebsite] = useState('');
  const [dataRoomLink, setDataRoomLink] = useState('');
  const [loanRequestsExpire, setLoanRequestsExpire] = useState('');
  const [loanPaymentCycle, setLoanPaymentCycle] = useState('');
  const [defaultLoans, setDefaultLoans] = useState('');
  const [loanProcessFee, setLoanProcessFee] = useState('');
  const [marketDescription, setMarketDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [page, setPage] = useState(1);
  const [hasInput, setHasInput] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const countryOptions = CountryList().getData();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleNext = () => {
    if (page === 1 && (!country || !marketName || !marketType || !assetClass || !website || !dataRoomLink)) {
      setHasInput(true);
      return;
    }
    if (page === 2 && (!loanRequestsExpire || !loanPaymentCycle || !defaultLoans || !loanProcessFee)) {
      setHasInput(true);
      return;
    }
    setPage(page + 1);
    setHasInput(false);
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleCancel = () => {
    if (
      country ||
      marketName ||
      marketType ||
      assetClass ||
      website ||
      dataRoomLink ||
      loanRequestsExpire ||
      loanPaymentCycle ||
      defaultLoans ||
      loanProcessFee ||
      marketDescription ||
      termsAccepted
    ) {
      setHasInput(true);
      setCancelDialogOpen(true);
    } else {
      setPage(1);
    }
  };

  const handleCancelConfirm = () => {
    setPage(1);
    setHasInput(false);
    setCancelDialogOpen(false);
  };

  const handleCancelCancel = () => {
    setCancelDialogOpen(false);
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh', marginLeft: '20px' }}>
      <Grid item xs={6}>
        {page === 1 && (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: 'bold' }}>Basic Information</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <Select
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countryOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Market Name"
                  value={marketName}
                  onChange={(e) => setMarketName(e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Market Type"
                  value={marketType}
                  onChange={(e) => setMarketType(e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Asset Class"
                  value={assetClass}
                  onChange={(e) => setAssetClass(e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Data Room Link"
                  value={dataRoomLink}
                  onChange={(e) => setDataRoomLink(e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
            {hasInput && <Typography variant="body2" color="error">Please fill in all fields.</Typography>}
            <div style={{ marginTop: '12px' }}>
              <Button 
                type="button" 
                onClick={handleNext} 
                variant="contained" 
                color="primary"
                style={{ borderRadius: '30px', padding: '10px 30px' }}
              >
                {`Continue ${page} of 4`}
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {page === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: 'bold' }}>Loan Information</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={
                    <div>
                      Loan Requests Expire
                      <Tooltip title="Information about Loan Requests Expire">
                        <InfoIcon color="primary" style={{ marginLeft: '5px', fontSize: '16px' }} />
                      </Tooltip>
                    </div>
                  }
                  value={loanRequestsExpire}
                  onChange={(e) => setLoanRequestsExpire(e.target.value)}
                  margin="normal"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={
                    <div>
                      Loan Payment Cycle
                      <Tooltip title="Information about Loan Payment Cycle">
                        <InfoIcon color="primary" style={{ marginLeft: '5px', fontSize: '16px' }} />
                      </Tooltip>
                    </div>
                  }
                  value={loanPaymentCycle}
                  onChange={(e) => setLoanPaymentCycle(e.target.value)}
                  margin="normal"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={
                    <div>
                      Default Loans
                      <Tooltip title="Information about Default Loans">
                        <InfoIcon color="primary" style={{ marginLeft: '5px', fontSize: '16px' }} />
                      </Tooltip>
                    </div>
                  }
                  value={defaultLoans}
                  onChange={(e) => setDefaultLoans(e.target.value)}
                  margin="normal"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={
                    <div>
                      Loan Process Fee
                      <Tooltip title="Information about Loan Process Fee">
                        <InfoIcon color="primary" style={{ marginLeft: '5px', fontSize: '16px' }} />
                      </Tooltip>
                    </div>
                  }
                  value={loanProcessFee}
                  onChange={(e) => setLoanProcessFee(e.target.value)}
                  margin="normal"
                  required
                  type="number"
                  inputProps={{ max: 100 }}
                />
              </Grid>
            </Grid>
            {hasInput && <Typography variant="body2" color="error">Please fill in all fields.</Typography>}
            <div style={{ marginTop: '12px' }}>
              <Button 
                type="button" 
                onClick={handleBack} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px' }}
              >
                <ArrowBackIcon /> Back
              </Button>
              <Button 
                type="button" 
                onClick={handleNext} 
                variant="contained" 
                color="primary"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                {`Continue ${page} of 4`}
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {page === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: 'bold' }}>Market Image and Description</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="upload-container">
                  <Dragger 
                    name="file"
                    multiple={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={handleImageUpload}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Supports single file upload. Strictly prohibit from uploading company data or other
                      band files
                    </p>
                  </Dragger>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Market Description"
                  value={marketDescription}
                  onChange={(e) => setMarketDescription(e.target.value)}
                  margin="normal"
                  required
                  multiline
                />
              </Grid>
            </Grid>
            {hasInput && <Typography variant="body2" color="error">Please fill in all fields.</Typography>}
            <div style={{ marginTop: '12px' }}>
              <Button 
                type="button" 
                onClick={handleBack} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px' }}
              >
                <ArrowBackIcon /> Back
              </Button>
              <Button 
                type="button" 
                onClick={handleNext} 
                variant="contained" 
                color="primary"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                {`Continue ${page} of 4`}
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {page === 4 && (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: 'bold' }}>Terms of Service</h2>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleTermsAcceptance}
                  color="primary"
                />
              }
              label="I accept the terms of service."
            />
            {hasInput && <Typography variant="body2" color="error">Please fill in all fields.</Typography>}
            <div style={{ marginTop: '12px' }}>
              <Button 
                type="button" 
                onClick={handleBack} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px' }}
              >
                <ArrowBackIcon /> Back
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                Submit
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outlined" 
                color="default"
                style={{ borderRadius: '30px', padding: '10px 30px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Grid>
      <Grid item xs={6}>
        <img 
          src="https://v2.teller.org/assets/teller_v2_Step3.0c1ebb64.svg" 
          alt="Form Illustration"
          style={{ width: '60%', marginLeft: '20%' }}
        />
      </Grid>
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCancelCancel}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <p>You have unsaved changes. Are you sure you want to cancel?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCancel} color="primary">
            No
          </Button>
          <Button onClick={handleCancelConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MarketForm;
