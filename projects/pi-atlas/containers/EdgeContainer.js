import React, { useState, useEffect, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Edge } from '../Edge';
import { EdgeService } from '../EdgeService';
import { EdgeMetrics } from '../EdgeMetrics';
import { EdgeSecurity } from '../EdgeSecurity';
import { EdgeNetworking } from '../EdgeNetworking';
import { EdgeStorage } from '../EdgeStorage';
import { EdgeAI } from '../EdgeAI';
import { EdgeQuantum } from '../EdgeQuantum';
import { AppContext } from '../AppContext';
import { NodeContainer } from './NodeContainer';

const EdgeContainer = ({ edge }) => {
  const [edgeState, setEdgeState] = useState({
    status: 'offline',
    metrics: {},
    security: {},
    networking: {},
    storage: {},
    ai: {},
    quantum: {},
    nodes: [],
  });

  const { account, library } = useWeb3React();
  const { appState, handleAppStateChange } = useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      const edgeService = new EdgeService(edge);
      const edgeMetrics = await edgeService.getMetrics();
      const edgeSecurity = await edgeService.getSecurity();
      const edgeNetworking = await edgeService.getNetworking();
      const edgeStorage = await edgeService.getStorage();
      const edgeAI = await edgeService.getAI();
      const edgeQuantum = await edgeService.getQuantum();
      const nodes = await edgeService.getNodes();
      setEdgeState({
        status: 'online',
        metrics: edgeMetrics,
        security: edgeSecurity,
        networking: edgeNetworking,
        storage: edgeStorage,
        ai: edgeAI,
        quantum: edgeQuantum,
        nodes,
      });
    };
    init();
  }, [edge]);

  useEffect(() => {
    const updateEdgeState = async () => {
      const edgeService = new EdgeService(edge);
      const edgeMetrics = await edgeService.getMetrics();
      const edgeSecurity = await edgeService.getSecurity();
      const edgeNetworking = await edgeService.getNetworking();
      const edgeStorage = await edgeService.getStorage();
      const edgeAI = await edgeService.getAI();
      const edgeQuantum = await edgeService.getQuantum();
      const nodes = await edgeService.getNodes();
      setEdgeState({
        metrics: edgeMetrics,
        security: edgeSecurity,
        networking: edgeNetworking,
        storage: edgeStorage,
        ai: edgeAI,
        quantum: edgeQuantum,
        nodes,
      });
    };
    updateEdgeState();
  }, [edgeState]);

  const handleEdgeStatusChange = async (newStatus) => {
    setEdgeState({ status: newStatus });
    const edgeService = new EdgeService(edge);
    await edgeService.updateStatus(newStatus);
  };

  const handleEdgeMetricsChange = async (newMetrics) => {
    setEdgeState({ metrics: newMetrics });
    const edgeService = new EdgeService(edge);
    await edgeService.updateMetrics(newMetrics);
  };

  const handleEdgeSecurityChange = async (newSecurity) => {
    setEdgeState({ security: newSecurity });
    const edgeService = new EdgeService(edge);
    await edgeService.updateSecurity(newSecurity);
  };

  const handleEdgeNetworkingChange = async (newNetworking) => {
    setEdgeState({ networking: newNetworking });
    const edgeService = new EdgeService(edge);
    await edgeService.updateNetworking(newNetworking);
  };

  const handleEdgeStorageChange = async (newStorage) => {
    setEdgeState({ storage: newStorage });
    const edgeService = new EdgeService(edge);
    await edgeService.updateStorage(newStorage);
  };

  const handleEdgeAIChange = async (newAI) => {
    setEdgeState({ ai: newAI });
    const edgeService = new EdgeService(edge);
    await edgeService.updateAI(newAI);
  };

  const handleEdgeQuantumChange = async (newQuantum) => {
    setEdgeState({ quantum: newQuantum });
    const edgeService = new EdgeService(edge);
    await edgeService.updateQuantum(newQuantum);
  };

  const handleNodeAdd = async (newNode) => {
    const edgeService = new EdgeService(edge);
    await edgeService.addNode(newNode);
    setEdgeState({ nodes: [...edgeState.nodes, newNode] });
  };

  const handleNodeRemove = async (nodeId) => {
    const edgeService = new EdgeService(edge);
    await edgeService.removeNode(nodeId);
    setEdgeState({ nodes: edgeState.nodes.filter((node) => node.id !== nodeId) });
  };

  return (
    <div className="edge-container">
      <h2>Edge {edge.id}</h2>
      <p>Status: {edgeState.status}</p>
      <p>Metrics: