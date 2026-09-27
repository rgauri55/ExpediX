import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  Compass,
  MinusCircle,
  Send,
  ArrowRightLeft,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Layers,
  Boxes,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { ConsumeItemModal } from '../components/inventory/ConsumeItemModal';
import { AllocateFieldModal } from '../components/inventory/AllocateFieldModal';
import { TransferLocationModal } from '../components/inventory/TransferLocationModal';
import { ReportDamagedModal } from '../components/inventory/ReportDamagedModal';
import type { InventoryStatus } from '../types';


export const InventoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById, inventory, backloadItem } = useInventory();

  const [isConsumeOpen, setIsConsumeOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDamagedOpen, setIsDamagedOpen] = useState(false);
  const [backloadSuccess, setBackloadSuccess] = useState(false);

  const item = (id ? getItemById(id) : undefined) || inventory[0];

  if (!item) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-polar-border">
        <h2 className="text-lg font-bold text-[#082D56]">Inventory Item Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The requested inventory supply record could not be retrieved from the active stock ledger.
        </p>
        <button
          onClick={() => navigate('/inventory')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-polar-blue rounded-xl"
        >
          Return to Inventory Registry
        </button>
      </div>
    );
  }

  const handleQuickBackload = () => {
    backloadItem({
      itemId: item.id,
      destination: 'Backload Storage',
      reason: 'Routine end-of-traverse return or seasonal mainland backload',
    });
    setBackloadSuccess(true);
    setTimeout(() => setBackloadSuccess(false), 4000);
  };

  const getStatusBadge = (status: InventoryStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Available at Station
          </span>
        );
      case 'Allocated':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Allocated for Field Task
          </span>
        );
      case 'Field Deployed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Field Deployed
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Low Stock Alert
          </span>
        );
      case 'Pending Receipt':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Pending Station Intake
          </span>
        );
      case 'Damaged':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            Damaged (In Backload)
          </span>
        );
      case 'Backload Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Backload Pending
          </span>
        );
      case 'Consumed':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Depleted / Consumed
          </span>
        );
    }
  };

  const isLow = item.quantity <= item.minThreshold;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Breadcrumbs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            to="/inventory"
            className="flex items-center gap-1 font-semibold text-polar-blue hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Inventory &amp; Resources</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">{item.linkedExpedition}</span>
          <span>/</span>
          <span className="text-slate-700 font-medium">{item.code}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold border border-sky-200">
            SIMULATION DATA • {item.code}
          </span>
        </div>
      </div>

      {/* 2. Top Profile Hero Card */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#082D56] via-[#0B3A6F] to-[#0A4B8F] text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg shrink-0">
                <Package className="w-7 h-7 text-sky-300" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
                    {item.code}
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold font-heading text-white">
                    {item.name}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-sky-100 font-medium">
                  {item.category} • <strong className="text-white text-base">{item.quantity} {item.unit}</strong>
                  <span className="text-sky-300 text-xs ml-2">(Min Threshold: {item.minThreshold} {item.unit})</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    Expedition: {item.linkedExpedition}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Location: {item.currentLocation}
                  </span>
                  {item.storageBin && (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-sky-200">
                      Storage: {item.storageBin}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 font-medium">Status:</span>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                <span>Last Movement: <strong className="text-white">{item.lastMovement}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-sky-200 font-medium">
                <Users className="w-3 h-3 text-sky-300" />
                <span>Custodian: {item.responsibleTeam}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Spec Strip */}
        <div className="px-6 py-3 bg-slate-50 border-t border-polar-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Linked Cargo Consignment</span>
            {item.linkedCargoConsignment ? (
              <Link
                to={`/cargo/${item.linkedCargoConsignment}`}
                className="font-bold text-polar-blue hover:underline flex items-center gap-1"
              >
                <Boxes className="w-3.5 h-3.5" />
                {item.linkedCargoConsignment} (View Cargo)
              </Link>
            ) : (
              <span className="text-slate-500 font-medium">Station Native Stock</span>
            )}
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Stock Health</span>
            <span className={`font-semibold flex items-center gap-1 ${
              isLow ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {isLow ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              {isLow ? 'Below Reserve Threshold' : 'Optimal Reserve Level'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Storage Location</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-polar-blue" />
              {item.currentLocation}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Batch &amp; Expiry</span>
            <span className="font-medium text-slate-700 truncate">
              {item.batchNumber || 'STANDARD-RESUPPLY'} {item.expiryDate ? `• Exp: ${item.expiryDate}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {backloadSuccess && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>Item marked for Return / Backload and routed to Backload Storage.</span>
        </div>
      )}

      {/* 3. Action Control Bar (Operational Dispatch & Consumption) */}
      <div className="bg-white p-4 rounded-2xl border border-polar-border shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-polar-border pb-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#082D56]">
            Operational Resource Actions
          </h2>
          <span className="text-[10px] font-mono text-slate-400">STATE MUTATION HANDLERS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {/* Record Consumption */}
          <button
            onClick={() => setIsConsumeOpen(true)}
            className="p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-polar-blue/40 rounded-xl font-semibold text-[#082D56] transition-all flex items-center gap-2 text-left"
          >
            <MinusCircle className="w-4 h-4 text-polar-blue shrink-0" />
            <div>
              <div className="leading-tight">Record Consumption</div>
              <span className="text-[10px] text-slate-400 font-normal">Deduct used units</span>
            </div>
          </button>

          {/* Allocate to Field */}
          <button
            onClick={() => setIsAllocateOpen(true)}
            className="p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-polar-blue/40 rounded-xl font-semibold text-[#082D56] transition-all flex items-center gap-2 text-left"
          >
            <Send className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <div className="leading-tight">Allocate to Field</div>
              <span className="text-[10px] text-slate-400 font-normal">Stage for camps</span>
            </div>
          </button>

          {/* Transfer Location */}
          <button
            onClick={() => setIsTransferOpen(true)}
            className="p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-polar-blue/40 rounded-xl font-semibold text-[#082D56] transition-all flex items-center gap-2 text-left"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="leading-tight">Transfer Location</div>
              <span className="text-[10px] text-slate-400 font-normal">Move storage depot</span>
            </div>
          </button>

          {/* Return / Backload */}
          <button
            onClick={handleQuickBackload}
            className="p-2.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl font-semibold text-amber-900 transition-all flex items-center gap-2 text-left"
          >
            <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <div className="leading-tight">Return / Backload</div>
              <span className="text-[10px] text-slate-400 font-normal">Stage for mainland</span>
            </div>
          </button>

          {/* Report Damaged */}
          <button
            onClick={() => setIsDamagedOpen(true)}
            className="p-2.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl font-semibold text-rose-900 transition-all flex items-center gap-2 text-left col-span-2 sm:col-span-1"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <div>
              <div className="leading-tight">Report Damaged</div>
              <span className="text-[10px] text-slate-400 font-normal">Log defect incident</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Main 2-Column Content Grid: Movement History (Left) + Directives & Cargo Link (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Vertical Movement History Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-polar-blue/10 text-polar-blue flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Supply Movement &amp; Lifecycle Journey</h3>
                  <p className="text-xs text-slate-500">From station intake to field staging, consumption, and return</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-polar-blue">
                {item.quantity} {item.unit} REMAINING
              </span>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {item.movementHistory.map((mov) => (
                <div key={mov.id} className="relative space-y-1.5 text-xs">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-polar-blue border-2 border-white shadow-xs" />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#082D56] text-xs">{mov.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{mov.dateFormatted} {mov.timestamp ? `• ${mov.timestamp}` : ''}</span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">{mov.description}</p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-0.5 flex-wrap">
                    {mov.fromLocation && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        From: <strong className="text-slate-700">{mov.fromLocation}</strong>
                      </span>
                    )}
                    {mov.toLocation && (
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
                        To: <strong className="text-sky-900">{mov.toLocation}</strong>
                      </span>
                    )}
                    {mov.quantityChanged !== undefined && mov.quantityChanged !== 0 && (
                      <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                        mov.quantityChanged > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        Delta: {mov.quantityChanged > 0 ? `+${mov.quantityChanged}` : mov.quantityChanged} {item.unit}
                      </span>
                    )}
                    {mov.actor && (
                      <span className="text-slate-400">Recorded by: {mov.actor}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right 1 Col: Linked Cargo Handoff & Storage Notes */}
        <div className="space-y-6">
          
          {/* Linked Cargo Consignment Card */}
          {item.linkedCargoConsignment && (
            <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3 text-xs">
              <div className="flex items-center gap-2 border-b border-polar-border pb-2.5">
                <Boxes className="w-4 h-4 text-polar-blue" />
                <h3 className="font-bold text-[#082D56]">Linked Cargo Consignment</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                This inventory item originated from maritime / air cargo consignment <strong>{item.linkedCargoConsignment}</strong>.
              </p>
              <Link
                to={`/cargo/${item.linkedCargoConsignment}`}
                className="w-full py-2 px-3 text-xs font-semibold text-polar-blue bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>View Shipment Manifest ({item.linkedCargoConsignment})</span>
              </Link>
            </div>
          )}

          {/* Storage & Handling Card */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-polar-border pb-2.5">
              <Layers className="w-4 h-4 text-polar-blue" />
              <h3 className="font-bold text-[#082D56]">Storage &amp; Custody Directives</h3>
            </div>

            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 font-medium">Station Location:</span>
                <span className="font-bold text-slate-800">{item.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 font-medium">Storage Bay / Bin:</span>
                <span className="font-mono font-bold text-polar-blue">{item.storageBin || 'UNASSIGNED'}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-400 font-medium">Managing Unit:</span>
                <span className="font-bold text-slate-800">{item.responsibleTeam}</span>
              </div>
            </div>
          </div>

          {/* Damage Reason Notice if Damaged */}
          {item.damageReason && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-1.5 text-xs text-rose-900">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Logged Damage Incident:</span>
              </div>
              <p className="leading-relaxed text-[11px]">{item.damageReason}</p>
            </div>
          )}

        </div>

      </div>

      {/* Operational Action Modals */}
      <ConsumeItemModal
        item={item}
        isOpen={isConsumeOpen}
        onClose={() => setIsConsumeOpen(false)}
      />

      <AllocateFieldModal
        item={item}
        isOpen={isAllocateOpen}
        onClose={() => setIsAllocateOpen(false)}
      />

      <TransferLocationModal
        item={item}
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />

      <ReportDamagedModal
        item={item}
        isOpen={isDamagedOpen}
        onClose={() => setIsDamagedOpen(false)}
      />

    </div>
  );
};
