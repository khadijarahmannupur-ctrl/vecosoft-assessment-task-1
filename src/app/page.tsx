'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_ORDERS } from '@/data/mockOrders';
import { ScenarioId, OrderData } from '@/types/order';
import { IssueCategory } from '@/types/issue';
import { OrderHeader } from '@/components/tracking/OrderHeader';
import { EtaCard } from '@/components/tracking/EtaCard';
import { Timeline } from '@/components/tracking/Timeline';
import { OrderSummary } from '@/components/tracking/OrderSummary';
import { QuickActions } from '@/components/tracking/QuickActions';
import { DelayBanner } from '@/components/tracking/DelayBanner';
import { DeliveryProofCard } from '@/components/tracking/DeliveryProofCard';
import { UntrackedState } from '@/components/tracking/UntrackedState';
import { SupportSheet } from '@/components/tracking/SupportSheet';
import { OrderDetailsSheet } from '@/components/tracking/OrderDetailsSheet';
import { IssueReportModal } from '@/components/tracking/IssueReportModal';
import { MissingPackageFlow } from '@/components/tracking/MissingPackageFlow';
import { SkeletonLoader } from '@/components/tracking/SkeletonLoader';
import { ErrorState } from '@/components/tracking/ErrorState';
import { EmptyState } from '@/components/tracking/EmptyState';
import { ScenarioSwitcher } from '@/components/demo/ScenarioSwitcher';
import { useToast } from '@/components/ui/Toast';

export default function OrderTrackingPage() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioId>('normal');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueInitialCategory, setIssueInitialCategory] = useState<IssueCategory>('package_damaged');
  const [isMissingFlowOpen, setIsMissingFlowOpen] = useState(false);
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const { showToast } = useToast();

  const handleSelectScenario = (scenario: ScenarioId) => {
    setIsLoadingTransition(true);
    setCurrentScenario(scenario);
    setTimeout(() => {
      setIsLoadingTransition(false);
    }, 300);
  };

  const handleOpenIssueModal = (category: IssueCategory = 'package_damaged') => {
    setIssueInitialCategory(category);
    setIsIssueModalOpen(true);
  };

  const currentOrder: OrderData | null = MOCK_ORDERS[currentScenario] || null;

  return (
    <div className="flex-1 flex flex-col justify-between relative bg-slate-50/50 dark:bg-slate-950">
      {/* Top Header - Always visible when order exists */}
      {currentOrder && !isLoadingTransition && (
        <OrderHeader
          orderNumber={currentOrder.orderNumber}
          orderDate={currentOrder.orderDate}
          status={currentOrder.status}
          onOpenSupport={() => setIsSupportOpen(true)}
        />
      )}

      {/* Main Scrollable Content Area */}
      <main className="flex-1 p-4 pb-24 space-y-4">
        {isLoadingTransition || currentScenario === 'loading' ? (
          <SkeletonLoader />
        ) : currentScenario === 'error' ? (
          <div className="pt-8">
            <ErrorState
              onRetry={() => handleSelectScenario('normal')}
              onOpenSupport={() => setIsSupportOpen(true)}
            />
          </div>
        ) : currentScenario === 'empty' || !currentOrder ? (
          <div className="pt-8">
            <EmptyState onSelectScenario={handleSelectScenario} />
          </div>
        ) : (
          <>
            {/* SCENARIO 1: Delayed Order Banner */}
            {currentScenario === 'delayed' && (
              <DelayBanner
                delayDays={currentOrder.eta.delayDays}
                delayReason={currentOrder.eta.delayReason}
                revisedEta={`${currentOrder.eta.displayDate} (${currentOrder.eta.timeWindow})`}
                onOpenSupport={() => setIsSupportOpen(true)}
                onReportIssue={() => handleOpenIssueModal('late_delivery')}
              />
            )}

            {/* SCENARIO 2: Proof of Delivery Card (for Delivered but Not Received) */}
            {currentScenario === 'delivered_not_received' && currentOrder.proofOfDelivery && (
              <DeliveryProofCard
                proof={currentOrder.proofOfDelivery}
                onOpenMissingFlow={() => setIsMissingFlowOpen(true)}
              />
            )}

            {/* Prominent Estimated Delivery Card */}
            <EtaCard order={currentOrder} />

            {/* SCENARIO 3: Untracked Preparation State Details */}
            {currentScenario === 'untracked' && currentOrder.untrackedInfo ? (
              <UntrackedState
                orderNumber={currentOrder.orderNumber}
                estimatedTrackingDate={currentOrder.untrackedInfo.estimatedTrackingDate}
                warehouseCity={currentOrder.untrackedInfo.warehouseCity}
                onOpenSupport={() => setIsSupportOpen(true)}
              />
            ) : (
              /* Visual Progress Stepper Timeline (Processing -> Shipped -> Out for Delivery -> Delivered) */
              <Timeline
                steps={currentOrder.timeline}
                carrierEvents={currentOrder.carrierEvents}
              />
            )}

            {/* Order / Product Summary */}
            <OrderSummary
              items={currentOrder.items}
              address={currentOrder.address}
              total={currentOrder.pricing.total}
              onViewOrderDetails={() => setIsDetailsOpen(true)}
            />

            {/* Quick Actions Bar */}
            <QuickActions
              onOpenSupport={() => setIsSupportOpen(true)}
              onOpenIssueForm={() => handleOpenIssueModal('package_damaged')}
              onOpenDetails={() => setIsDetailsOpen(true)}
            />
          </>
        )}
      </main>

      {/* ========================================================================= */}
      {/* Bottom Sheets & Dialog Modals */}
      {/* ========================================================================= */}

      {/* 1. Contact Support Bottom Sheet (Live Chat, Call, Email, FAQs) */}
      <SupportSheet
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        orderNumber={currentOrder?.orderNumber || 'ORD-89421'}
      />

      {/* 2. Order Details Bottom Sheet (Itemized breakdown, tax, shipping, payment) */}
      {currentOrder && (
        <OrderDetailsSheet
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          order={currentOrder}
        />
      )}

      {/* 3. Report Delivery Issue Modal Form (Category, note, mock photo, ticket) */}
      <IssueReportModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        orderNumber={currentOrder?.orderNumber || 'ORD-89421'}
        initialCategory={issueInitialCategory}
      />

      {/* 4. Missing Package Guided Flow (Checklist -> Priority Claim) */}
      <MissingPackageFlow
        isOpen={isMissingFlowOpen}
        onClose={() => setIsMissingFlowOpen(false)}
        orderNumber={currentOrder?.orderNumber || 'ORD-61205'}
        onProceedToReport={() => handleOpenIssueModal('not_received')}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Floating Demo Scenario Switcher */}
      <ScenarioSwitcher
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
      />
    </div>
  );
}
