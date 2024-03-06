"use client";
import { PlusCircle, Upload, Trash2, X, Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
export default function ExcelFileReader() {
  const [userList, setUserList]: any = useState([]);

  async function submit(e: any) {
    e.preventDefault();
    await axios.post(
      `/api/fakeAPI`,
      userList
      //   {
      //     headers: {
      //       Authorization: process.env.AUTHORIZATION,
      //       key: process.env.key,
      //       runas: process.env.runas,
      //       pwd: process.env.pwd,
      //     },
      //   }
    );
    toast.success("Run complete");
    // if (userList.length === 0) {
    //   alert("Please add some questions");
    // } else {

    // }
  }
  const fileRef: any = useRef();

  //check valid excel file
  const isExcelFile = (file: { name: any }) => {
    const allowedExtensions = [".xlsx", ".xls"];
    const fileName = file.name;
    const fileExtension = fileName
      .slice(fileName.lastIndexOf("."))
      .toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };
  const handleFile = (e: { target: any }) => {
    const year = new Date();
    const date = new Date(year.getFullYear(), 6, 1).toISOString();
    const file = e.target.files[0];
    if (!file) return;

    if (isExcelFile(file) && file.size != 0) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e: any) => {
        const data1 = e.target.result;
        const workbook = XLSX.read(data1, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData: any = XLSX.utils.sheet_to_json(sheet, {
          raw: true,
          header: [],
        });
        let returnArr: any = [];
        for (let i = 0; i < parsedData.length; i++) {
          const item: any = {
            AccountName: "",
            Password: "",
            DomainName: "",
            UserPrincipalName: "",
            SAMAccountName: "",
            DistinguishedName: "",

            PrivateKey: "",
            Passphrase: "",
            PasswordFallbackFlag: true,
            LoginAccountFlag: true,
            Description: "",
            PasswordRuleID: 0,
            ApiEnabled: true,
            ReleaseNotificationEmail: "",
            ChangeServicesFlag: true,
            RestartServicesFlag: true,
            ChangeTasksFlag: true,
            ReleaseDuration: 0,
            MaxReleaseDuration: 0,
            ISAReleaseDuration: 0,
            MaxConcurrentRequests: 0,

            AutoManagementFlag: true,
            DSSAutoManagementFlag: true,
            CheckPasswordFlag: true,
            ResetPasswordOnMismatchFlag: true,
            ChangePasswordAfterAnyReleaseFlag: true,
            ChangeFrequencyType: "",
            ChangeFrequencyDays: 0,
            ChangeTime: "",
            NextChangeDate: date,

            UseOwnCredentials: true,
            ChangeIISAppPoolFlag: true,
            RestartIISAppPoolFlag: true,
            WorkgroupID: 0,
            ChangeWindowsAutoLogonFlag: true,
            ChangeComPlusFlag: true,
            ChangeDComFlag: true,
            ChangeSComFlag: true,

            ObjectID: "",
          };
          returnArr = [...returnArr, item];
        }
        setUserList([...userList, ...returnArr]);

        // setData(parsedData);
      };
      // setFileName(file.name);
    } else {
      alert("Invalid file format");
    }
  };

  return (
    <main className="min-h-full items-center">
      <div className="w-full p-8 bg-white">
        <div className="pb-3">
          <label className="block text-lg mb-2">Import user list</label>
          <div className="flex items-center w-full">
            <label className="w-64 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
              <span>Choose File</span>
              <input
                className="hidden"
                type="file"
                id="formFile"
                accept=".xlsx,.xls"
                onChange={(e) => handleFile(e)}
                ref={fileRef}
              />
            </label>
            <button type="button" onClick={(e) => submit(e)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
