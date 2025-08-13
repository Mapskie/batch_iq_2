"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import ItemUploads from "./@readings_uploaded/page";
import FileSelector from "@/features/overview/components/overview-form";
import { WorkItems } from "@/features/overview/components/workitems";
import { WalltimeTable } from "@/features/overview/components/batch-wall-time";
import { BatchLUWTable } from "@/features/overview/components/batch-luw";

export default function OverViewLayout({
  selectedFile: initialSelectedFile,
}: {
  selectedFile?: string;
  readings_uploaded: React.ReactNode;
  workitems: React.ReactNode;
  batch_wall_time: React.ReactNode;
  batch_luw: React.ReactNode;
}) {
  const [generatedReportData, setGeneratedReportData] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    initialSelectedFile
  );
  const [meterReadingData, setMeterReadingData] = useState<any[]>([]);
  const [workItemsData, setWorkItemsData] = useState<any[]>([]);
  const [wallTimeData, setWallTimeData] = useState<any[]>([]);
  const [batchLuw, setBatchLuwData] = useState<any[]>([]);

  // Load generatedReportData once on mount
  useEffect(() => {
    async function fetchGeneratedReports() {
      try {
        const res = await fetch("/api/generated-reports", { cache: "no-store" });
        const data = await res.json();
        setGeneratedReportData(data.generatedReportData || []);
      } catch (error) {
        console.error("Failed to fetch generated reports:", error);
      }
    }
    fetchGeneratedReports();
  }, []);

  // When selectedFile changes, fetch data
  useEffect(() => {
    if (!selectedFile) {
      setMeterReadingData([]);
      setWorkItemsData([])
      setWallTimeData([])
      setBatchLuwData([])
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/dashboard-data?file=${selectedFile}`, {
          cache: "no-store",
        });
        const data = await res.json();
        
        setMeterReadingData(data.readings || []);
        setWorkItemsData(data.workItems || []);
        setWallTimeData(data.wallTime ||[])
        setBatchLuwData(data.batchLuw || [])
      } catch (error) {
        setMeterReadingData([]);
        setWorkItemsData([])
        setWallTimeData([])
        setBatchLuwData([])
      }
    }

    fetchData();
  }, [selectedFile]);

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
          <div className="col-span-3">
            <FileSelector
              generatedReportData={generatedReportData}
              selectedFile={selectedFile}
              onDataLoaded={(data) => {
                setMeterReadingData(data.readings || []);
                setWorkItemsData(data.workItems || []);
                setWallTimeData(data.wallTime || []);
                setBatchLuwData(data.batchLuw || []);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8 mt-4">
          <div className="col-span-5">
            <ItemUploads data={meterReadingData} />
          </div>
          {/* <div className="col-span-3">{workitems}</div> */}
          <div className="col-span-3"><WorkItems workItemsData={workItemsData}/></div>
          <div className="col-span-4"><WalltimeTable data={wallTimeData}/></div>
          <div className="col-span-4"><BatchLUWTable data={batchLuw}/></div>
        </div>
      </div>
    </PageContainer>
  );
}
